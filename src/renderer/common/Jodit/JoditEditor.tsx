import { Component } from 'react';
import * as React from 'react';
import * as Jodit from 'jodit';

import { DialogSelectImage } from 'src/renderer/component/Templates/DialogSelectImage';

import 'jodit/build/jodit.min.css';

export namespace JoditEditorSpace {
  export interface IState {

  }

  export interface IProps {
    value: string;
    option: object;
    onChangeValue: (value: string) => void;
  }
}

export class JoditEditor extends Component<JoditEditorSpace.IProps, JoditEditorSpace.IState> {

  state = {};

  private readonly textArea;
  private editor;

  constructor(props) {
    super(props);
    this.textArea = React.createRef();
  }

  componentDidMount(): void {
    this.createEditor();
  }

  componentWillUnmount(): void {
    this.destructEditor();
  }

  destructEditor = () => {
    if (this.editor) {
      this.editor.destruct();
    }
  }

  createEditor = () => {
    this.destructEditor();
    const config = {
      extraButtons: [
        {
          name: 'insertImage',
          exec: (editor) => {
            this.setState({ selectImageOpen: true });
          },
        },
      ],
    };
    if (this.textArea) {
      console.log('new Jodit ', this.textArea);
      this.editor = new Jodit(this.textArea.current, config);
    }
  }

  render() {
    return (
      <>
        <textarea ref={this.textArea}/>
        <DialogSelectImage
          handleClose={this.handleCloseSelectImage}
          isOpen={this.state.selectImageOpen}
          insertImage={this.insertImage}
        />
      </>
    );
  }
}
