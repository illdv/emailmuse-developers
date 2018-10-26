import * as React from 'react';
import { Component } from 'react';
import * as Jodit from 'jodit';

import DialogInsertImage from 'src/renderer/common/Jodit/dialogs/insertImage/DialogInsertImage';
import DialogInsertLinkButton from 'src/renderer/common/Jodit/dialogs/insertLinkButton/DialogInsertLinkButton';
import DialogInsertSnippet from 'src/renderer/common/Jodit/dialogs/insertSnippet/DialogInsertSnippet';

import 'jodit/build/jodit.min.css';
import './JoditEditor.scss';

interface IDialog {
  open: boolean;
}

enum DialogName {
  insertImage = 'insertImage',
  insertLinkButton = 'insertLinkButton',
  insertSnippet = 'insertSnippet',
}

export namespace JoditEditorSpace {
  export interface IState<T extends string> {
    current: any;
    dialogs: { [keys in T]?: IDialog };
    isOpenSourse: boolean;
  }

  export interface IProps {
    value: string;
    onChangeValue?: (value: string) => void;
    preheader: string;
  }
}

export class JoditEditor extends Component<
  JoditEditorSpace.IProps,
  JoditEditorSpace.IState<DialogName>
> {
  constructor(props) {
    super(props);
    this.textArea = React.createRef();
  }

  state: JoditEditorSpace.IState<DialogName> = {
    current: null,
    dialogs: {
      [DialogName.insertLinkButton]: { open: false },
      [DialogName.insertImage]: { open: false },
      [DialogName.insertSnippet]: { open: false },
    },
    isOpenSourse: false,
  };

  destructEditor = () => {
    if (this.editor) {
      this.editor.destruct();
      const querySelector = document.querySelector('.jodit_container');
      if (querySelector) {
        querySelector.remove();
      }
    }
  }

  createEditor = () => {
    this.destructEditor();
    if (this.textArea) {
      this.editor = new Jodit(this.textArea.current, this.createOption());
      const { value, onChangeValue, preheader } = this.props;
      this.editor.value = this.state.isOpenSourse
        ? `<p>${preheader}</p>${value}` || ''
        : `${value}` || '';

      // this.editor.insertHTML('<div>qqqqqqqqqqqqqqqqqqqqqqqq</div>');
      if (onChangeValue) {
        this.editor.events.on('change', onChangeValue);
      }
    }
  }

  createOption = () => {
    return {
      readonly: !this.props.onChangeValue,
      cleanHTML: {
        removeEmptyElements: true,
        denyTags: {
          meta: true,
        },
        replaceOldTags: {
          i: 'em',
          b: 'strong',
        },
      },
      toolbarAdaptive: false,
      buttons: [
        'source',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'ul',
        'ol',
        'outdent',
        'indent',
        'align',
        '|',
        'cut',
        'undo',
        'redo',
        '|',
        'table',
        'link',
      ],
      extraButtons: [
        {
          tooltip: 'Insert image',
          name: 'insertImage',
          exec: this.handleOpenDialog(DialogName.insertImage),
        },
        {
          tooltip: 'Insert button',
          name: 'insertLinkButton',
          exec: this.handleOpenDialog(DialogName.insertLinkButton),
        },
        {
          tooltip: 'Insert snippet',
          name: 'insertSnippet',
          exec: this.handleOpenDialog(DialogName.insertSnippet),
        },
      ],
    };
  }

  handleOpenDialog = (nameDialog: DialogName) => () => {
    const current = this.editor.selection.current();
    this.setState({
      current,
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
    const current = this.state.current;
    if (current) {
      this.editor.selection.select(current);
    }
    this.editor.selection.insertHTML(html);
    callback();
  }
  private readonly textArea;

  private editor;

  componentDidMount(): void {
    this.createEditor();
  }

  componentWillUnmount(): void {
    this.destructEditor();
  }

  componentWillUpdate(): void {
    if (this.props.value === null) {
      this.destructEditor();
    }
  }

  render() {
    const dialogs = this.state.dialogs;

    const foo = document.querySelector('.jodit_toolbar_btn-source');

    const observer = new MutationObserver(mutations => {
      let isOpenSourse;

      return mutations.forEach(mutation => {
        return (isOpenSourse =
          mutation.oldValue === 'jodit_toolbar_btn jodit_toolbar_btn-source');
      });
    });

    foo && observer.observe(foo, { attributes: true, attributeOldValue: true });

    return (
      <>
        <textarea ref={this.textArea} />
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
