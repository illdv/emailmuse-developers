import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Fade, Paper, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { bindActionCreators } from 'redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { emailToEditEntity, templateToItem } from 'src/renderer/component/Templates/utils';
import { Fab } from 'src/renderer/common/Fab';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { useOrDefault } from 'src/renderer/utils';
import { TemplateActions } from 'src/renderer/component/Templates/flux/module';
import { ITemplateActions, ITemplateState } from 'src/renderer/component/Templates/flux/interface';
import { ActionStatus } from 'src/renderer/flux/interface';
import { IColumn, ListTable } from 'src/renderer/common/List/ListTable/ListTable';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { EditorActions, IEditorActions } from 'src/renderer/component/Editor/flux/actions';
import { ISwipeActions, SwipeActions } from 'src/renderer/component/Swipe/flux/actions';

export namespace MailListSpace {
  export interface IProps {
    templates?: ITemplateState;
    action?: ITemplateActions;
    swipeActions?: ISwipeActions;
    editorActions?: IEditorActions;
    onShowToast?: (messages: string, type: ToastType) => void;
  }

  export interface IState {
    newTemplate: ITemplate;
  }
}

export class Templates extends React.Component<MailListSpace.IProps, MailListSpace.IState> {

  state: MailListSpace.IState = {
    newTemplate: null,
  };

  componentDidMount() {
    const page = useOrDefault(() => (this.props.templates.pagination.current_page), 1);
    this.props.action.loading({ page });
  }

  onChangePage = (e, page: number) => {
    this.props.action.loading({ page: page + 1 });
  }

  selectTemplate = (template: ITemplate) => () => {
    this.props.editorActions.edit.REQUEST(emailToEditEntity(template));
  }

  onSelectNewTemplate = () => {
    this.props.action.selectNewTemplate({});
  }

  onCopy = (id: string) => {
    this.props.action.copy({ id });
  }

  onSearch = (searchWorld: string) => {
    const page = useOrDefault(() => (this.props.templates.pagination.current_page), 1);
    this.props.action.loading({ page, search: searchWorld });
  };

  render() {
    const { status, templates, pagination } = this.props.templates;

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
            <ListTable
              title='Emails'
              entities={templates}
              toItem={templateToItem}
              onOpenItem={this.selectTemplate}
              pagination={pagination}
              onChangePage={this.onChangePage}
              onCopy={this.onCopy}
              onSearch={this.onSearch}
              isLoading={status === ActionStatus.REQUEST}
              columnData={columnData}
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
  templates: state.templates,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  action: bindActionCreators(TemplateActions, dispatch),
  onShowToast: (messages: string, type: ToastType) => {
    dispatch(FluxToast.Actions.showToast(messages, type));
  },
  editorActions: bindModuleAction(EditorActions, dispatch),
  swipeActions: bindModuleAction(SwipeActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
