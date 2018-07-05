import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import { Close, Delete, Save } from '@material-ui/icons';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { EditorActions, IEditorActions } from 'src/renderer/component/Editor/flux/actions';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { IEditorState } from 'src/renderer/component/Editor/flux/reducer';
import { JoditEditor } from 'src/renderer/common/Jodit/JoditEditor';
import { IEditEntity, IEditEntityParameter } from 'src/renderer/component/Editor/flux/interface';
import { Fab } from 'src/renderer/common/Fab';
import { firstSymbolUp } from 'src/renderer/component/Editor/utils';

import block from 'bem-ts';

import './Editor.scss';

const b = block('editor');

export namespace EditorSpace {
  export interface IState {
    html: string;
    idEditSession: string;
    hasChange: boolean;
    params: IEditEntityParameter;
  }

  export interface IProps {
    editor?: IEditorState;
    editorActions?: IEditorActions;
  }
}

class Editor extends Component<EditorSpace.IProps, EditorSpace.IState> {

  state: EditorSpace.IState = {
    html: '',
    idEditSession: '',
    hasChange: false,
    params: {},
  };

  static getDerivedStateFromProps(
    nextProps: EditorSpace.IProps,
    prevState: EditorSpace.IState): EditorSpace.IState {

    const { html, params, idEditSession } = nextProps.editor.editEntity;
    if (idEditSession !== prevState.idEditSession) {
      return {
        hasChange: false,
        html,
        params,
        idEditSession,
      };
    }
    return null;
  }

  onChange = (html: string) => {
    this.setState({
      html,
      hasChange: true,
    });
  }

  onChangeField = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState(state => ({
      ...state,
      params: {
        ...state.params,
        [key]: {
          ...state.params[key],
          value,
        },
      },
    } as any));
  }

  getEntity = (): IEditEntity => {
    return {
      ...this.props.editor.editEntity,
      html: this.state.html,
      params: this.state.params,
    };
  }

  onRemove = () => {
    this.props.editorActions.remove.REQUEST({
      editEntity: this.getEntity(),
    });
  }

  onSave = () => {
    this.props.editorActions.save.REQUEST({
      editEntity: this.getEntity(),
    });
  }

  onClose = () => {
    this.props.editorActions.close.REQUEST({
      editEntity: this.getEntity(),
    });
  }

  renderParameters = () => {
    return Object.keys(this.state.params).map(key => (
      <TextField
        key={key}
        className={b('text-field')}
        id={key}
        label={firstSymbolUp(key)}
        margin='normal'
        InputLabelProps={{
          shrink: true,
        }}
        value={this.state.params[key].value}
        onChange={this.onChangeField(key)}
      />
    ));
  }

  render() {
    return (
      <>
        {this.renderParameters()}
        <JoditEditor onChangeValue={this.onChange} value={this.state.html}/>
        <div>
          <Fab
            color={'secondary'}
            onClick={this.onRemove}
            icon={<Delete/>}
            position={0}
            title={'Remove'}
          />
          <Fab
            onClick={this.onSave}
            icon={<Save/>}
            position={1}
            title={'Save'}
            whitCtrl
            hotKey={'S'}
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

const mapStateToProps = (state: IGlobalState) => ({
  editor: state.editor,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  editorActions: bindModuleAction(EditorActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
