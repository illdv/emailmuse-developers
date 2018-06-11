import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { connect, Dispatch } from 'react-redux';
import { Close, Delete, Save } from '@material-ui/icons';
import block from 'bem-ts';

import { JoditEditor } from 'src/renderer/common/Jodit/JoditEditor';
import { Fab } from 'src/renderer/common/Fab';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { Confirmation } from 'src/renderer/common/Dialogs/Confirmation';

import './SnippetsEditor.scss';

const b = block('snippets-editor');

export namespace SnippetsEditorSpace {
  export interface IState {
    shortcut: string;
    id: number;
    body: string;
    hasChange: boolean;
    isOpenConfirmationClose: boolean;
    isOpenConfirmationDelete: boolean;
  }

  export interface IProps {
    onRemove: () => void;
    onClose: () => void;
    onSave: (newSnippet: ISnippet, saveAndClose: boolean) => void;
    snippet: ISnippet;
    onShowToast?: (messages: string, type: ToastType) => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onShowToast: (messages: string, type: ToastType) => {
    dispatch(FluxToast.Actions.showToast(messages, type));
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
export class SnippetsEditor extends Component<SnippetsEditorSpace.IProps, SnippetsEditorSpace.IState> {

  state: SnippetsEditorSpace.IState = {
    id: -1,
    shortcut: '',
    body: '',
    hasChange: false,
    isOpenConfirmationClose: false,
    isOpenConfirmationDelete: false,
  };

  static getDerivedStateFromProps(
    nextProps: SnippetsEditorSpace.IProps,
    prevState: SnippetsEditorSpace.IState): SnippetsEditorSpace.IState {

    const { snippet } = nextProps;
    if (snippet.id !== prevState.id) {
      const { id, body, shortcut } = snippet;
      return {
        body,
        id,
        shortcut,
        hasChange: false,
        isOpenConfirmationClose: false,
        isOpenConfirmationDelete: false,
      };

    }
    return null;
  }

  onSave = (saveAndClose?: boolean) => () => {
    const snippet                         = this.props.snippet;
    const { body, shortcut } = this.state;

    if (shortcut.length === 0) {
      this.props.onShowToast('Snippet name cannot be empty', ToastType.Warning);
      return;
    }

    if (body.length === 0) {
      this.props.onShowToast('Body cannot be empty', ToastType.Warning);
      return;
    }

    this.setState({hasChange: false});
    this.props.onSave(
      {
        ...snippet,
        body,
        shortcut,
      },
      saveAndClose,
    );
  }

  onChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    this.setState({ [id]: value, hasChange: true } as any);
  }

  onChangeBody = (body: string) => {
    this.setState({ body, hasChange: true });
  }

  onCloseDialogClose = () => {
    this.setState({ isOpenConfirmationClose: false });
  }

  onCloseDialogDelete = () => {
    this.setState({ isOpenConfirmationDelete: false });
  }

  onClose = () => {
    if (this.state.hasChange) {
      this.setState({ isOpenConfirmationClose: true });
    } else {
      this.props.onClose();
    }
  }

  onRemove = () => {
    this.setState({ isOpenConfirmationDelete: true });
  }

  render() {
    const { onRemove } = this.props;

    return (
      <>
        <Grid item xs={12}>
          <TextField
            className={b('text-field')}
            id='shortcut'
            label='Snippet name'
            margin='normal'
            value={this.state.shortcut}
            onChange={this.onChangeField}
          />
        </Grid>
        <JoditEditor onChangeValue={this.onChangeBody} value={this.state.body}/>
        <Confirmation
          isOpen={this.state.isOpenConfirmationClose}
          onClose={this.onCloseDialogClose}
          onSelectYes={this.onSave(true)}
          onSelectNo={this.props.onClose}
          question={'The changes are not saved. Are you want save snippet?'}
        />
        <Confirmation
          isOpen={this.state.isOpenConfirmationDelete}
          onClose={this.onCloseDialogDelete}
          onSelectYes={onRemove}
          question={'Are you want to delete this snippet?'}
        />
        <div>
          <Fab
            color={'secondary'}
            onClick={this.onRemove}
            icon={<Delete/>}
            position={0}
          />
          <Fab
            onClick={this.onSave(false)}
            icon={<Save/>}
            position={1}
          />
          <Fab
            onClick={this.onClose}
            icon={<Close/>}
            position={2}
          />
        </div>
      </>
    );
  }
}
