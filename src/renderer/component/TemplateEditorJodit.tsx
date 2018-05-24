import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';

import * as Jodit from 'jodit';
import 'jodit/build/jodit.min.css';

export namespace TemplateEditorJoditSpace {
  export interface IState {
    value: string;
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

  state = { value: '' };

  constructor(props) {
    super(props);
  }

  private editor;

  componentDidMount() {
    // this.createEditor();
  }

  createEditor = (textArea) => {
    const config = {
      minWidth: 200, filebrowser: {
        ajax: {
          url: 'connector/index.php',
        },
      },
    };

    this.editor = new Jodit(textArea, config);
  }

  render() {
    return <textarea ref={(textArea) => this.createEditor(textArea)}/>;
  }
}
