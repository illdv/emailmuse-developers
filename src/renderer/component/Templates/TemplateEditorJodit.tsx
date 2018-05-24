import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';


import { DialogSelectImage } from 'src/renderer/component/Templates/DialogSelectImage';
import './TemplateEditorJodit.scss';

export namespace TemplateEditorJoditSpace {
  export interface IState {
    value: string;
    selectImageOpen: boolean;
  }

  export interface IProps {

  }
}

const mapStateToProps = (state: IGlobalState) => ({
  /// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  /*
    onLoadingMail: () => {
     dispatch(Mail.Actions.onLoadingMail.REQUEST());
   },
  */
});

@(connect(mapStateToProps, mapDispatchToProps))
export class TemplateEditorJodit extends Component<TemplateEditorJoditSpace.IProps, TemplateEditorJoditSpace.IState> {

  state = { value: '', selectImageOpen: false };

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
    console.log('componentWillUnmount');
    this.destructEditor();
  }

  destructEditor = () => {
    console.log('destructEditor + ', this.editor);
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

  handleCloseSelectImage = () => {
    this.setState({ selectImageOpen: false });
  }

  insertImage = (url: string) => {
    this.editor.selection.insertHTML(`<img src="${url}"/>`);
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
