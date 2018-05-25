import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import { Close, Delete, Save } from '@material-ui/icons';
import block from 'bem-ts';

import { JoditEditor } from 'src/renderer/common/Jodit/JoditEditor';
import { ITemplate } from 'src/renderer/component/Templates/flux/models';
import { Fab } from 'src/renderer/common/Fab';
import { Grid, TextField } from '@material-ui/core';
import './TemplateEditor.scss';

const b = block('template-editor');

export namespace TemplateEditorSpace {
  export interface IState {
    templateId: number;
    value: string;
    title: string;
    description: string;
  }

  export interface IProps {
    template?: ITemplate;
    save: (template: ITemplate) => void;
    remove: () => void;
    close: () => void;
  }
}

export class TemplateEditor extends Component<TemplateEditorSpace.IProps, TemplateEditorSpace.IState> {

  state: TemplateEditorSpace.IState = { value: '', templateId: -1, description: '', title: '' };

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
    });
  }

  onChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    this.setState({ [id]: value } as any);
  }

  onSave = () => {
    const template                      = this.props.template;
    const { value, title, description } = this.state;

    template.body        = value;
    template.title       = title;
    template.description = description;
    this.props.save(template);
  }

  render() {
    const { close, remove } = this.props;
    return (
      <>
        <Grid item xs={12}>
          <TextField
            className={b('text-field')}
            id='title'
            label='Title'
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
        <div>
          <Fab
            onClick={remove}
            icon={<Delete/>}
            position={2}
          />
          <Fab
            onClick={this.onSave}
            icon={<Save/>}
            position={1}
          />
          <Fab
            onClick={close}
            icon={<Close/>}
            position={0}
          />
        </div>
      </>
    );
  }
}
