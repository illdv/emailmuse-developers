import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Fade, TextField } from '@material-ui/core';
import { Close, Delete, Save } from '@material-ui/icons';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { EditorActions, IEditorActions } from 'src/renderer/component/Editor/flux/actions';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { IEditorState } from 'src/renderer/component/Editor/flux/reducer';
import { JoditEditor } from 'src/renderer/common/Jodit/JoditEditor';
import { IEditEntity, IEditEntityParameter } from 'src/renderer/component/Editor/flux/interface';
import { Fab } from 'src/renderer/common/Fab';
import { firstSymbolUp } from 'src/renderer/component/Editor/utils';
import { Confirmation } from 'src/renderer/common/DialogProvider/Confirmation';

import block from 'bem-ts';

import './Editor.scss';

const b = block('editor');

export namespace EditorSpace {
  export interface IState {
    html: string;
    idFrontEnd: string;
    hasChange: boolean;
    params: IEditEntityParameter;
    isOpenConfirmationClose: boolean;
    isOpenConfirmationDelete: boolean;
  }

  export interface IProps {
    editor?: IEditorState;
    editorActions?: IEditorActions;
  }
}

class Editor extends Component<EditorSpace.IProps, EditorSpace.IState> {

  state: EditorSpace.IState = {
    html: '',
    idFrontEnd: '',
    hasChange: false,
    params: {},
    isOpenConfirmationClose: false,
    isOpenConfirmationDelete: false,
  };

  static getDerivedStateFromProps(
    nextProps: EditorSpace.IProps,
    prevState: EditorSpace.IState): EditorSpace.IState {

    const { html, params, idFrontEnd } = nextProps.editor.editEntity;
    if (idFrontEnd !== prevState.idFrontEnd) {
      return {
        hasChange: false,
        html,
        params,
        idFrontEnd,
        isOpenConfirmationClose: false,
        isOpenConfirmationDelete: false,
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
      hasChange: true,
      params: {
        ...state.params,
        [key]: value,
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
    this.props.editorActions.remove.REQUEST(this.getEntity());
  }

  onSave = () => {
    this.props.editorActions.save.REQUEST(this.getEntity());
    this.setState({
      hasChange: false,
    });
  }

  onSaveAndClose = () => {
    this.props.editorActions.saveAndClose.REQUEST(this.getEntity());
  }

  onClose = () => {
    this.props.editorActions.close.REQUEST(this.getEntity());
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
        value={this.state.params[key]}
        onChange={this.onChangeField(key)}
      />
    ));
  }

  onOpenDialogClose = () => {
    if (this.state.hasChange) {
      this.setState({ isOpenConfirmationClose: true });
      return;
    }
    this.onClose();
  }

  onOpenDialogDelete = () => {
    this.setState({ isOpenConfirmationDelete: true });
  }

  onCloseDialogClose = () => {
    this.setState({ isOpenConfirmationClose: false });
  }

  onCloseDialogDelete = () => {
    this.setState({ isOpenConfirmationDelete: false });
  }

  render() {
    return (
      <Fade in timeout={2000}>
        <div>
          {this.renderParameters()}
          <JoditEditor onChangeValue={this.onChange} value={this.state.html}/>
          <div>
            <Confirmation
              isOpen={this.state.isOpenConfirmationClose}
              onClose={this.onCloseDialogClose}
              onSelectYes={this.onSaveAndClose}
              onSelectNo={this.onClose}
              title={'Warning'}
              question={'Your changes are not saved. Do you want to leave this page? Click cancel to stay.'}
            />
            <Confirmation
              isOpen={this.state.isOpenConfirmationDelete}
              onClose={this.onCloseDialogDelete}
              onSelectYes={this.onRemove}
              question={'You are about to delete a email and this action cannot be undone?'}
            />
            <Fab
              color={'secondary'}
              onClick={this.onOpenDialogDelete}
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
              onClick={this.onOpenDialogClose}
              icon={<Close/>}
              position={2}
              title={'Close'}
            />
          </div>
        </div>
      </Fade>
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
