import * as React from 'react';
import { Component } from 'react';
import * as Jodit from 'jodit';

import { DialogSelectImage } from 'src/renderer/common/Jodit/dialogs/DialogSelectImage';
import { DialogEditLinkButton } from 'src/renderer/common/Jodit/dialogs/DialogEditLinkButton';

import 'jodit/build/jodit.min.css';
import './JoditEditor.scss';
import { Button } from '@material-ui/core/es';

interface IDialog {
  open: boolean;
}

enum DialogName {
  selectImage = 'selectImage',
  linkButton = 'linkButton',
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
      [DialogName.linkButton]: { open: false },
      [DialogName.selectImage]: { open: false },
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
      this.editor.value = this.props.value;
      this.editor.events.on('change', this.props.onChangeValue);
    }
  }

  createOption = () => {
    return {
      extraButtons: [
        {
          name: 'insertImage',
          exec: this.handleOpenDialog(DialogName.selectImage),
        },
        {
          name: 'insertLinkButton',
          exec: this.handleOpenDialog(DialogName.linkButton),
        },
      ],
    };
  }

  handleOpenDialog = (nameDialog: DialogName) => () => {
    this.setState({
      dialogs: {
        ...this.state.dialogs,
        [nameDialog]: { open: true }
      },
    });
  }

  handleCloseDialog = (nameDialog: DialogName) => () => {
    this.setState({
      dialogs: {
        ...this.state.dialogs,
        [nameDialog]: { open: false }
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
        <DialogSelectImage
          isOpen={dialogs[DialogName.selectImage].open}
          insertHTML={this.insertHTML}
          handleClose={this.handleCloseDialog(DialogName.selectImage)}
        />
        <DialogEditLinkButton
          isOpen={dialogs[DialogName.linkButton].open}
          insertHTML={this.insertHTML}
          handleClose={this.handleCloseDialog(DialogName.linkButton)}
        />
      </>
    );
  }
}
