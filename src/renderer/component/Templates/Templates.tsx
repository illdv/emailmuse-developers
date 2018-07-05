import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Fade, Paper, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { bindActionCreators } from 'redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { Loading } from 'src/renderer/common/Loading';
import { templateToItem } from 'src/renderer/component/Templates/utils';
import { Fab } from 'src/renderer/common/Fab';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { useOrDefault } from 'src/renderer/utils';
import { TemplateActions } from 'src/renderer/component/Templates/flux/module';
import { ITemplateActions, ITemplateState } from 'src/renderer/component/Templates/flux/interface';
import { ActionStatus } from 'src/renderer/flux/interface';
import { ListTable } from 'src/renderer/common/List/ListTable/ListTable';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { EditorActions, IEditorActions } from 'src/renderer/component/Editor/flux/actions';
import { EntityType, ParamType } from 'src/renderer/component/Editor/flux/interface';

export namespace MailListSpace {
  export interface IProps {
    templates?: ITemplateState;
    action?: ITemplateActions;
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
    this.props.editorActions.edit.REQUEST({
      editEntity: {
        id: template.id,
        idFrontEnd: new Date().getTime().toString(),
        type: EntityType.Email,
        html: template.body,
        params: {
          title: { value: template.title, type: ParamType.Text },
          description: { value: template.description, type: ParamType.Text },
        },
      },
    });
  }

  onSelectNewTemplate = () => {
    this.props.editorActions.edit.REQUEST({
      editEntity: {
        id: null,
        idFrontEnd: new Date().getTime().toString(),
        type: EntityType.Email,
        html: 'Content email',
        params: {
          title: { value: 'Title email', type: ParamType.Text },
          description: { value: 'Description email', type: ParamType.Text },
        },
      },
    });
  }

  onCopy = (id: string) => {
    this.props.action.copy({ id });
  }

  render() {
    const { status, templates, pagination } = this.props.templates;

    if (status === ActionStatus.REQUEST) {
      return <Loading/>;
    }

    if (status === ActionStatus.FAILURE) {
      return (
        <Typography variant='headline' noWrap align='center'>
          Sorry but we couldn't download the templates.
        </Typography>
      );
    }

    return (
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
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  templates: state.templates,
});

// TODO: Use createActions!
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  action: bindActionCreators(TemplateActions, dispatch),
  onShowToast: (messages: string, type: ToastType) => {
    dispatch(FluxToast.Actions.showToast(messages, type));
  },
  editorActions: bindModuleAction(EditorActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
