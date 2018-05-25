import * as React from 'react';
import { Component } from 'react';
import { Close, Delete, Save } from '@material-ui/icons';

import { JoditEditor } from 'src/renderer/common/Jodit/JoditEditor';
import { ITemplate } from 'src/renderer/component/Templates/flux/models';
import { Fab } from 'src/renderer/common/Fab';

export namespace TemplateEditorSpace {
  export interface IState {
    templateId: number;
    value: string;
  }

  export interface IProps {
    template?: ITemplate;
    save: (template: ITemplate) => void;
    remove: () => void;
    close: () => void;
  }
}

export class TemplateEditor extends Component<TemplateEditorSpace.IProps, TemplateEditorSpace.IState> {

  state: TemplateEditorSpace.IState = { value: '', templateId: -1 };

  static getDerivedStateFromProps(
    nextProps: TemplateEditorSpace.IProps,
    prevState: TemplateEditorSpace.IState): TemplateEditorSpace.IState {

    const { template } = nextProps;
    if (template.id !== prevState.templateId) {
      return {
        templateId: template.id,
        value: template.body,
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

  onSave = () => {
    const template = this.props.template;
    template.body  = this.state.value;
    this.props.save(template);
  }

  render() {
    const { close, remove } = this.props;
    return (
      <>
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
