import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Fade, Paper, Typography } from '@material-ui/core';
import { Add, CreateNewFolder } from '@material-ui/icons';
import { bindActionCreators } from 'redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { emailToEditEntity, nodeToItem } from 'src/renderer/component/Emails/utils';
import { Fab } from 'src/renderer/common/Fab';
import { INode, nodeType } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { useOrDefault } from 'src/renderer/utils';
import { EmailActions } from 'src/renderer/component/Emails/flux/module';
import { IEmailActions, ITemplateState } from 'src/renderer/component/Emails/flux/interface';
import { ActionStatus } from 'src/renderer/flux/interface';
import { IColumn } from 'src/renderer/common/List/ListTable/ListTable';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { EditorActions, IEditorActions } from 'src/renderer/component/Editor/flux/actions';
import { ISwipeActions, SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { folderActions, IFolderActions } from 'src/renderer/component/Folder/flux/actions';
import { NodeTableList } from 'src/renderer/component/Emails/NodeList/NodeTableList';

export namespace EmailListSpace {
  export interface IProps {
    emailNodes?: ITemplateState;
    action?: IEmailActions;
    swipeActions?: ISwipeActions;
    editorActions?: IEditorActions;
    onShowToast?: (messages: string, type: ToastType) => void;
    actionFolders: IFolderActions;
  }

  export interface IState {
    newEmail: INode;
    currentNodeId: number;
  }
}

export class Emails extends React.Component<EmailListSpace.IProps, EmailListSpace.IState> {
  state: EmailListSpace.IState = {
    newEmail: null,
    currentNodeId: null,
  };

  componentDidMount() {
    const page = useOrDefault(() => (this.props.emailNodes.pagination.current_page), 1);
    this.props.action.loading({ page });
  }

  onChangePage = (e, page: number) => {
    this.props.action.loading({ page: page + 1 });
  }

  selectNode = (node: INode) => () => {
    if (node.type === nodeType.folder) {
      this.setState({ currentNodeId: node.node_id });
    } else {
      this.props.editorActions.edit.REQUEST(emailToEditEntity(node));
    }
  }

  onSelectNewTemplate = () => {
    this.props.action.selectNewTemplate({});
  }

  onCreateNewFolder = () => {
    this.props.actionFolders.showModal.REQUEST({ parentId: this.state.currentNodeId });
  }

  onCopy = (id: string) => {
    this.props.action.copy({ id });
  }

  onSearch = (searchWorld: string) => {
    const page = useOrDefault(() => (this.props.emailNodes.pagination.current_page), 1);
    this.props.action.loading({ page, search: searchWorld });
  }

  setCurrentParentId = (id: number) => {
    this.setState({ currentNodeId: id });
  }

  render() {
    const { status, templates, pagination } = this.props.emailNodes;
    console.log('Emails', templates);
    if (status === ActionStatus.FAILURE) {
      return (
        <Typography variant='headline' noWrap align='center'>
          Sorry but we couldn't download the templates.
        </Typography>
      );
    }

    const columnData: IColumn[] = [
      { id: '1', label: 'Subject', disablePadding: false, numeric: false },
      { id: '2', label: 'Description', disablePadding: false, numeric: false },
      { id: '3', label: 'Last update', disablePadding: false, numeric: false },
    ];

    return (
      <div>
        <Fade in timeout={1000}>
          <Paper>
            <NodeTableList
              title='Emails'
              entities={templates}
              toItem={nodeToItem}
              onOpenItem={this.selectNode}
              pagination={pagination}
              onChangePage={this.onChangePage}
              onCopy={this.onCopy}
              onSearch={this.onSearch}
              isLoading={status === ActionStatus.REQUEST}
              columnData={columnData}
              onCurrentParentId={this.setCurrentParentId}
            />
            <Fab
              onClick={this.onCreateNewFolder}
              icon={<CreateNewFolder/>}
              position={1}
              title={'Add a folder'}
              whitCtrl
              hotKey={'F'}
            />
            <Fab
              onClick={this.onSelectNewTemplate}
              icon={<Add/>}
              position={0}
              title={'Add a new email'}
              whitCtrl
              hotKey={'A'}
            />
          </Paper>
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  emailNodes: state.emailNodes,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  action: bindActionCreators(EmailActions, dispatch),
  onShowToast: (messages: string, type: ToastType) => {
    dispatch(FluxToast.Actions.showToast(messages, type));
  },
  editorActions: bindModuleAction(EditorActions, dispatch),
  swipeActions: bindModuleAction(SwipeActions, dispatch),
  actionFolders: bindModuleAction(folderActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Emails);
