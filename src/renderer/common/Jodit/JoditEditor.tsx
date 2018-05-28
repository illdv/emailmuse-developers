import * as React from 'react';
import { Component } from 'react';
import * as Jodit from 'jodit';

import { DialogSelectImage } from 'src/renderer/component/Templates/dialog/DialogSelectImage';

import 'jodit/build/jodit.min.css';
import './JoditEditor.scss';

export namespace JoditEditorSpace {
  export interface IState {
    selectImageOpen: boolean;
  }

  export interface IProps {
    value: string;
    onChangeValue: (value: string) => void;
  }
}

export class JoditEditor extends Component<JoditEditorSpace.IProps, JoditEditorSpace.IState> {

  state = {
    selectImageOpen: false,
  };

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
    if (this.textArea) {
      this.editor = new Jodit(this.textArea.current, this.createOption());
      this.editor.value = this.props.value;
      this.editor.events.on('change', this.props.onChangeValue);
    }
  }

  createOption = () => {
    return {
      extraButtons: [
        {
          name: 'insertImage',
          exec: (editor) => {
            this.setState({ selectImageOpen: true });
          },
        },
      ],
    };
  }

  handleCloseSelectImage = () => {
    this.setState({ selectImageOpen: false });
  }

  insertImage = (url: string) => {
    this.editor.selection.insertHTML(`<img src="${url}"/>`);
    this.setState({selectImageOpen: false});
  }

  render() {
    const { selectImageOpen } = this.state;
    return (
      <>
        <textarea ref={this.textArea}/>
        <DialogSelectImage
          handleClose={this.handleCloseSelectImage}
          isOpen={selectImageOpen}
          insertImage={this.insertImage}
        />
      </>
    );
  }
}
