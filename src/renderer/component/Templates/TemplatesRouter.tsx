import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Typography } from '@material-ui/core';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { add, closeTemplate, create, loading, remove, select, set } from 'src/renderer/component/Templates/flux/module';
import { TemplateEditor } from 'src/renderer/component/Templates/TemplateEditor';
import { Loading } from 'src/renderer/common/Loading';
import TemplatesList from 'src/renderer/component/Templates/TemplatesList';
import { ITemplateState, TemplateStatus } from 'src/renderer/component/Templates/flux/models';
import { createEmptyTemplate } from 'src/renderer/component/Templates/utils';
import { Fab } from 'src/renderer/common/Fab';
import { Add } from '@material-ui/icons';
import { ITemplate } from 'src/renderer/component/Templates/flux/entity';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';

export namespace MailListSpace {
  export interface IProps {
    templates?: ITemplateState;
    loading?: (page?: number) => void;
    remove?: (templateId: number) => void;
    set?: (template: ITemplate) => void;
    create?: (template: ITemplate) => void;
    add?: (template: ITemplate) => void;
    select?: (template: ITemplate) => void;
    close?: () => void;
    onShowToast: (messages: string, type: ToastType) => void;
  }

  export interface IState {

  }
}

const mapStateToProps = (state: IGlobalState) => ({
  templates: state.templates,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  loading: () => dispatch(loading(1)),
  remove: (templateId: number) => dispatch(remove(templateId)),
  set: (template: ITemplate) => dispatch(set(template)),
  create: (template: ITemplate) => dispatch(create(template)),
  add: (template: ITemplate) => dispatch(add(template)),
  select: (template: ITemplate) => dispatch(select(template)),
  close: () => dispatch(closeTemplate()),
  onShowToast: (messages: string, type: ToastType) => {
    dispatch(FluxToast.Actions.showToast(messages, type));
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
class TemplatesRouter extends React.Component<MailListSpace.IProps, MailListSpace.IState> {

  componentDidMount() {
    this.props.loading();
  }

  onEditTemplate = (template: ITemplate) => {
    this.props.select(template);
  }

  onCloseTemplate = () => {
    this.props.close();
  }

  onRemoveTemplate = () => {
    const templates = this.props.templates;
    this.props.remove(templates.selectedTemplate.id);
  }

  onSaveTemplate = (template: ITemplate) => {
    this.props.set(template);
  }

  onCreateTemplate = (template: ITemplate) => {
    if (!template.body && template.body.length === 0) {
      this.props.onShowToast(`Body can't be empty`, ToastType.Warning);
      return;
    }
    if (!template.title && template.title.length === 0) {
      this.props.onShowToast(`Title can't be empty`, ToastType.Warning);
      return;
    }
    this.props.create(template);
  }

  onSelectNewTemplate = () => {
    this.props.add(createEmptyTemplate());
  }

  onChangePage = (e, page) => {
    this.props.loading(page + 1);
  }

  render() {
    const { status, templates, selectedTemplate, pagination } = this.props.templates;

    if (status === TemplateStatus.Loading) {
      return <Loading/>;
    }

    if (status === TemplateStatus.Failed) {
      return (
        <Typography variant='headline' noWrap align='center'>
          Sorry but we couldn't download the templates.
        </Typography>
      );
    }

    if (status === TemplateStatus.EditTemplate) {
      return (
        <TemplateEditor
          template={selectedTemplate}
          close={this.onCloseTemplate}
          remove={this.onRemoveTemplate}
          save={this.onSaveTemplate}
        />
      );
    }

    if (status === TemplateStatus.CreateTemplate) {
      return (
        <TemplateEditor
          template={createEmptyTemplate()}
          close={this.onCloseTemplate}
          remove={this.onCloseTemplate}
          save={this.onCreateTemplate}
        />
      );
    }

    return (
      <div>
        <TemplatesList
          templates={templates}
          selectTemplate={this.onEditTemplate}
          onChangePage={this.onChangePage}
          pagination={pagination}
        />
        <div>
          <Fab
            onClick={this.onSelectNewTemplate}
            icon={<Add/>}
            position={0}
          />
        </div>
      </div>
    );
  }
}

export default TemplatesRouter;
