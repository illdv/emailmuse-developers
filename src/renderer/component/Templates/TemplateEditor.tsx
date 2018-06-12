import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import { Close, Delete, Save, ContentCopy } from '@material-ui/icons';
import block from 'bem-ts';

import { JoditEditor } from 'src/renderer/common/Jodit/JoditEditor';
import { Fab } from 'src/renderer/common/Fab';
import { Grid, TextField } from '@material-ui/core';
import './TemplateEditor.scss';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { Confirmation } from 'src/renderer/common/Dialogs/Confirmation';

const b = block('template-editor');

export namespace TemplateEditorSpace {
  export interface IState {
    templateId: string;
    value: string;
    title: string;
    description: string;
    hasChange: boolean;
    isOpenConfirmationClose: boolean;
    isOpenConfirmationDelete: boolean;
  }

  export interface IProps {
    template?: ITemplate;
    save: (template: ITemplate, saveAndClose?: boolean) => void;
    remove: () => void;
    close: () => void;
  }
}

export class TemplateEditor extends Component<TemplateEditorSpace.IProps, TemplateEditorSpace.IState> {

  state: TemplateEditorSpace.IState = {
    value: '',
    templateId: null,
    description: '',
    title: '',
    hasChange: false,
    isOpenConfirmationClose: false,
    isOpenConfirmationDelete: false,
  };

  static getDerivedStateFromProps(
    nextProps: TemplateEditorSpace.IProps,
    prevState: TemplateEditorSpace.IState): TemplateEditorSpace.IState {

    const { template } = nextProps;
    if (template.id !== prevState.templateId) {
      return {
        templateId: template.id,
        value: template.body,
        title: template.title,
        description: template.description || '',
        hasChange: false,
        isOpenConfirmationClose: false,
        isOpenConfirmationDelete: false,
      };

    }
    return null;
  }

  constructor(props) {
    super(props);
  }

  onChange = (value: string) => {
    this.setState({
      value,
      hasChange: true,
    });
  }

  onChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    this.setState({ [id]: value, hasChange: true } as any);
  }

  getNewTemplate = (): ITemplate => {
    const { value, title, description } = this.state;

    return {
      ...this.props.template,
      body: value,
      title,
      description,
    };
  }

  onSave = (saveAndClose: boolean) => () => {
    this.props.save(this.getNewTemplate(), saveAndClose);
    this.setState({ hasChange: false });
  }

  onClose = () => {
    if (this.state.hasChange) {
      this.setState({ isOpenConfirmationClose: true });
    } else {
      this.props.close();
    }
  }

  onCloseDialogClose = () => {
    this.setState({ isOpenConfirmationClose: false });
  }

  onCloseDialogDelete = () => {
    this.setState({ isOpenConfirmationDelete: false });
  }

  onRemove = () => {
    this.setState({ isOpenConfirmationDelete: true });
  }

  render() {
    return (
      <>
        <Grid item xs={12}>
          <TextField
            className={b('text-field')}
            id='title'
            label='Subject'
            margin='normal'
            value={this.state.title}
            onChange={this.onChangeField}
          />
          <TextField
            multiline
            className={b('text-field')}
            id='description'
            label='Description'
            margin='normal'
            value={this.state.description}
            onChange={this.onChangeField}
          />
        </Grid>
        <JoditEditor onChangeValue={this.onChange} value={this.state.value}/>
        <Confirmation
          isOpen={this.state.isOpenConfirmationClose}
          onClose={this.onCloseDialogClose}
          onSelectYes={this.onSave(true)}
          onSelectNo={this.props.close}
          question={'The changes are not saved. Are you want save template?'}
        />
        <Confirmation
          isOpen={this.state.isOpenConfirmationDelete}
          onClose={this.onCloseDialogDelete}
          onSelectYes={this.props.remove}
          question={'Are you want to delete this template?'}
        />
        <div>
          <Fab
            color={'secondary'}
            onClick={this.onRemove}
            icon={<Delete/>}
            position={0}
            title={'Remove'}
          />
          <Fab
            onClick={this.onSave(false)}
            icon={<Save/>}
            position={1}
            title={'Save'}
          />
          <Fab
            onClick={this.onClose}
            icon={<Close/>}
            position={2}
            title={'Close'}
          />
        </div>
      </>
    );
  }
}
