import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { bindActionCreators } from 'redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { TemplateEditor } from 'src/renderer/component/Templates/TemplateEditor';
import { Loading } from 'src/renderer/common/Loading';
import { createEmptyTemplate, templateToItem } from 'src/renderer/component/Templates/utils';
import { Fab } from 'src/renderer/common/Fab';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { useOrDefault } from 'src/renderer/utils';
import { TemplateAction } from 'src/renderer/component/Templates/flux/module';
import { ITemplateAction, ITemplateState } from 'src/renderer/component/Templates/flux/interface';
import { ActionStatus } from 'src/renderer/flux/interface';
import { ElementList } from 'src/renderer/common/List/ElementList';

export namespace MailListSpace {
  export interface IProps {
    templates?: ITemplateState;
    action?: ITemplateAction;
    onShowToast?: (messages: string, type: ToastType) => void;
  }

  export interface IState {
    newTemplate: ITemplate;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  templates: state.templates,
});

// TODO: Use createActions!
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  action: bindActionCreators(TemplateAction, dispatch),
  onShowToast: (messages: string, type: ToastType) => {
    dispatch(FluxToast.Actions.showToast(messages, type));
  },
});

export class Templates extends React.Component<MailListSpace.IProps, MailListSpace.IState> {

  state: MailListSpace.IState = {
    newTemplate: null,
  };

  componentDidMount() {
    const page = useOrDefault(() => (this.props.templates.pagination.current_page), 1);
    this.props.action.loading({ page });
  }

  selectTemplate = (template: ITemplate) => () => {
    this.props.action.select(template);
  }

  // TODO: for validation use TextValidator
  private validation = (template: ITemplate): boolean => {
    if (!template.body && template.body.length === 0) {
      this.props.onShowToast(`Body can't be empty`, ToastType.Warning);
      return false;
    }
    if (!template.title && template.title.length === 0) {
      this.props.onShowToast(`Subject can't be empty`, ToastType.Warning);
      return false;
    }
    return true;
  }

  onChangePage = (e, page: number) => {
    this.props.action.loading({ page: page + 1 });
  }

  onSelectNewTemplate = () => {
    this.props.action.select(createEmptyTemplate());
  }

  onSaveOrCreate = (newTemplate: ITemplate, saveAndClose: boolean = false) => {
    if (!this.validation(newTemplate)) {
      return;
    }

    const { templates, action } = this.props;

    if (templates.selectedTemplate.id) {
      action.save({ template: newTemplate, saveAndClose });
    } else {
      action.create(newTemplate);
    }
  }

  onCloseOrRemove = () => {
    const { templates, action } = this.props;

    const id = templates.selectedTemplate.id;

    if (id) {
      action.remove(id);
    } else {
      action.select(null);
    }
  }

  onClose = () => {
    this.props.action.select(null);
  }

  onCopy = (id: string) => {
    this.props.action.copy({id});
  }

  render() {
    const { status, templates, pagination, selectedTemplate } = this.props.templates;

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

    if (selectedTemplate) {
      return (
        <TemplateEditor
          template={selectedTemplate}
          close={this.onClose}
          remove={this.onCloseOrRemove}
          save={this.onSaveOrCreate}
        />
      );
    }

    return (
      <Paper>
        <ElementList
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
          title={'Add new template'}
          whitCtrl
          hotKey={'A'}
        />
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
