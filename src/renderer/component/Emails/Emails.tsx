import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Fade, Paper, Typography } from '@material-ui/core';
import { Add, Close, CreateNewFolder } from '@material-ui/icons';
import { bindActionCreators } from 'redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { emailToEditEntity, nodeToItem } from 'src/renderer/component/Emails/utils';
import { Fab } from 'src/renderer/common/Fab';
import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { EmailActions } from 'src/renderer/component/Emails/flux/module';
import { IEmailActions, IEmailsState } from 'src/renderer/component/Emails/flux/interface';
import { ActionStatus } from 'src/renderer/flux/interface';
import { IColumn } from 'src/renderer/common/List/ListTable/ListTable';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { EditorActions, IEditorActions } from 'src/renderer/component/Editor/flux/actions';
import { ISwipeActions, SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { folderActions, IFolderActions } from 'src/renderer/component/Folder/flux/actions';
import { NodeTableList } from 'src/renderer/component/Emails/NodeList/NodeTableList';
import { IFolder } from 'src/renderer/component/Folder/flux/interface';

export enum nodeType {
  email  = 'email',
  folder = ' folder',
}

export namespace EmailListSpace {
  export interface IProps {
    emailNodes?: IEmailsState;
    emailsActions?: IEmailActions;
    foldersActions: IFolderActions;
    swipeActions?: ISwipeActions;
    editorActions?: IEditorActions;
    onShowToast?: (messages: string, type: ToastType) => void;
    actionFolders: IFolderActions;
    folders: IFolder[];
  }

  export interface IState {
    newEmail: IEmail;
    currentNodeId: number;
    searchWorld: string;
  }
}

export class Emails extends React.Component<EmailListSpace.IProps, EmailListSpace.IState> {
  state: EmailListSpace.IState = {
    newEmail: null,
    currentNodeId: null,
    searchWorld: '',
  };

  componentDidMount() {
    // const page = useOrDefault(() => (this.props.emailNodes.pagination.current_page), 1);
    // this.props.action.loading({ page });
    this.props.emailsActions.loading({});
  }

  onChangePage = (e, page: number) => {
    // this.props.action.loading({ page: page + 1 });
    this.props.emailsActions.loading({});
  }

  selectNode = (node: { item: IEmail, type }) => {
    const { item, type } = node;
    if (type === nodeType.folder) {
      const parentId = Number(item.id);
      // TODO: Fix setTimeout
      setTimeout(() => {
        this.setState({ currentNodeId: parentId });
      }, 400);
      this.props.emailsActions.getEmailFromFolder({ parentId });
    } else {
      this.props.editorActions.edit.REQUEST(emailToEditEntity(item));
    }
  }

  onSelectNewTemplate = () => {
    this.props.emailsActions.selectNewTemplate({ parentId: this.state.currentNodeId });
  }

  onCreateNewFolder = () => {
    this.props.foldersActions.showModal.REQUEST({ parentId: this.state.currentNodeId });
  }

  onUpdateEmail = (data: { id: number, folder_id: number }) => {
    this.props.emailsActions.save({ email: data } as any);
  }

  onDeleteFolder = (id: number) => {
    this.props.foldersActions.deleteFolder.REQUEST({ ids: [id] });
  }

  onCopy   = (id: string) => {
    this.props.emailsActions.copy({ id });
  }
  // ToDo fix me
  onSearch = (searchWorld: string) => {
    // const page = useOrDefault(() => (this.props.emailNodes.pagination.current_page), 1);
    // this.props.action.loading({ page, search: searchWorld });
    this.props.emailsActions.loading({s: searchWorld});
    this.setState({
      searchWorld,
    });
  }

  setCurrentParentId = (id: number) => {
    this.setState({ currentNodeId: id });
  }

  closeFolder = () => {
    this.props.emailsActions.loading({});
    this.setState({
      currentNodeId: null,
    });
  }

  render() {
    let { emails }           = this.props.emailNodes;
    const { status }         = this.props.emailNodes;
    const folders: IFolder[] = this.props.folders;
    const { currentNodeId, searchWorld }  = this.state;
    if (status === ActionStatus.FAILURE) {
      return (
        <Typography variant='headline' noWrap align='center'>
          Sorry but we couldn't download the emails.
        </Typography>
      );
    }

    const columnData: IColumn[] = [
      { id: '1', label: 'Subject', disablePadding: false, numeric: false },
      { id: '2', label: 'Description', disablePadding: false, numeric: false },
      { id: '3', label: 'Last update', disablePadding: false, numeric: false },
    ];

    if (currentNodeId === null && searchWorld === '') {
      emails = emails.filter(email => email.folder_id === null);
    }

    return (
      <div>
        <Fade in timeout={1000}>
          <Paper>
            <NodeTableList
              title='Emails'
              emails={emails}
              folders={folders}
              toItem={nodeToItem}
              onOpenItem={this.selectNode}
              onUpdateEmail={this.onUpdateEmail}
              onChangePage={this.onChangePage}
              onCopy={this.onCopy}
              onSearch={this.onSearch}
              isLoading={status === ActionStatus.REQUEST}
              columnData={columnData}
              onCurrentParentId={this.setCurrentParentId}
              onDeleteFolder={this.onDeleteFolder}
            />
            {
              (currentNodeId === null) ?
                <Fab
                  onClick={this.onCreateNewFolder}
                  icon={<CreateNewFolder/>}
                  position={1}
                  title={'Add a folder'}
                  whitCtrl
                  hotKey={'F'}
                />
                :
                null

            }
            {
              (currentNodeId !== null) ?
                <Fab
                  onClick={this.closeFolder}
                  icon={<Close/>}
                  position={1}
                  title={'Close'}
                />
                :
                null
            }
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
  emailNodes: state.emails,
  folders: state.folders.folders,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  emailsActions: bindActionCreators(EmailActions, dispatch),
  foldersActions: bindModuleAction(folderActions, dispatch),
  editorActions: bindModuleAction(EditorActions, dispatch),
  swipeActions: bindModuleAction(SwipeActions, dispatch),
  onShowToast: (messages: string, type: ToastType) => {
    dispatch(FluxToast.Actions.showToast(messages, type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Emails);
