import * as React from 'react';
import { Component } from 'react';
import * as Jodit from 'jodit';

import { DialogInsertImage } from 'src/renderer/common/Jodit/dialogs/insertImage/DialogInsertImage';
import { DialogInsertLinkButton } from 'src/renderer/common/Jodit/dialogs/insertLinkButton/DialogInsertLinkButton';
import { DialogInsertSnippet } from 'src/renderer/common/Jodit/dialogs/insertSnippet/DialogInsertSnippet';

import 'jodit/build/jodit.min.css';
import './JoditEditor.scss';

interface IDialog {
  open: boolean;
}

enum DialogName {
  insertImage      = 'insertImage',
  insertLinkButton = 'insertLinkButton',
  insertSnippet    = 'insertSnippet',
}

export namespace JoditEditorSpace {

  export interface IState<T extends string> {
    dialogs: {
      [keys in T]?: IDialog;
    };
  }

  export interface IProps {
    value: string;
    onChangeValue: (value: string) => void;
  }
}

export class JoditEditor extends Component<JoditEditorSpace.IProps, JoditEditorSpace.IState<DialogName>> {

  state = {
    dialogs: {
      [DialogName.insertLinkButton]: { open: false },
      [DialogName.insertImage]: { open: false },
      [DialogName.insertSnippet]: { open: false },
    },
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
      this.editor.value = this.props.value || '';
      this.editor.events.on('change', this.props.onChangeValue);
    }
  }

  createOption = () => {
    return {
      buttons: [
        'source',
        '|', 'bold', 'italic', 'underline', 'strikethrough',
        '|', 'font', 'fontsize', 'brush', 'paragraph',
        '|', 'ul', 'ol', 'outdent', 'indent', 'align',
        '|', 'cut', 'hr', 'eraser', 'copyformat',
        '|', 'undo', 'redo',
        '|', 'table', 'link',
      ],
      extraButtons: [
        {
          name: 'insertImage',
          exec: this.handleOpenDialog(DialogName.insertImage),
        },
        {
          name: 'insertLinkButton',
          exec: this.handleOpenDialog(DialogName.insertLinkButton),
        },
        {
          name: 'insertSnippet',
          exec: this.handleOpenDialog(DialogName.insertSnippet),
        },
      ],
    };
  }

  handleOpenDialog = (nameDialog: DialogName) => () => {
    this.setState({
      dialogs: {
        ...this.state.dialogs,
        [nameDialog]: { open: true },
      },
    });
  }

  handleCloseDialog = (nameDialog: DialogName) => () => {
    this.setState({
      dialogs: {
        ...this.state.dialogs,
        [nameDialog]: { open: false },
      },
    });
  }

  insertHTML = (html: string, callback: () => void) => {
    this.editor.selection.insertHTML(html);
    callback();
  }

  render() {
    const dialogs = this.state.dialogs;
    return (
      <>
        <textarea ref={this.textArea}/>
        <DialogInsertImage
          isOpen={dialogs[DialogName.insertImage].open}
          insertHTML={this.insertHTML}
          handleClose={this.handleCloseDialog(DialogName.insertImage)}
        />
        <DialogInsertLinkButton
          isOpen={dialogs[DialogName.insertLinkButton].open}
          insertHTML={this.insertHTML}
          handleClose={this.handleCloseDialog(DialogName.insertLinkButton)}
        />
        <DialogInsertSnippet
          isOpen={dialogs[DialogName.insertSnippet].open}
          insertHTML={this.insertHTML}
          handleClose={this.handleCloseDialog(DialogName.insertSnippet)}
        />
      </>
    );
  }
}
