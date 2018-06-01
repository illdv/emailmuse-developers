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

const b = block('template-editor');

export namespace SnippetsEditorSpace {
  export interface IState {
    shortcut: string;
    id: number;
    description: string;
    body: string;
  }

  export interface IProps {
    onRemove: (snippetId: string) => void;
    onClose: () => void;
    onSave: (newSnippet: ISnippet) => void;
    snippet: ISnippet;
    onShowToast?: (messages: string, type: ToastType) => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onShowToast: (messages: string, type: ToastType) => {
    dispatch(FluxToast.Actions.showToast(messages, type));
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
export class SnippetsEditor extends Component<SnippetsEditorSpace.IProps, SnippetsEditorSpace.IState> {

  state: SnippetsEditorSpace.IState = {
    id: -1,
    description: '',
    shortcut: '',
    body: '',
  };

  static getDerivedStateFromProps(
    nextProps: SnippetsEditorSpace.IProps,
    prevState: SnippetsEditorSpace.IState): SnippetsEditorSpace.IState {

    const { snippet } = nextProps;
    if (snippet.id !== prevState.id) {
      const { id, body, description, shortcut } = snippet;
      return {
        body,
        description,
        id,
        shortcut,
      };

    }
    return null;
  }

  onSave = () => {
    const snippet                         = this.props.snippet;
    const { body, shortcut, description } = this.state;

    if (!shortcut.length) {
      this.props.onShowToast('Snippet code cannot be empty', ToastType.Warning);
      return;
    }

    if (!body.length) {
      this.props.onShowToast('Body cannot be empty', ToastType.Warning);
      return;
    }

    if (!description.length) {
      this.props.onShowToast('Description cannot be empty', ToastType.Warning);
      return;
    }

    this.props.onSave(
      {
        ...snippet,
        body,
        shortcut,
        description,
      },
    );
  }

  onChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    this.setState({ [id]: value } as any);
  }

  onChangeBody = (body: string) => {
    this.setState({ body });
  }

  render() {
    const { onRemove, onClose } = this.props;

    return (
      <>
        <Grid item xs={12}>
          <TextField
            className={b('text-field')}
            id='shortcut'
            label='Snippet code'
            margin='normal'
            value={this.state.shortcut}
            onChange={this.onChangeField}
          />
          <TextField
            multiline
            className={b('text-field')}
            id='description'
            label='Description'
            margin='normal'
            value={this.state.description}
            onChange={this.onChangeField}
          />
        </Grid>
        <JoditEditor onChangeValue={this.onChangeBody} value={this.state.body}/>
        <div>
          <Fab
            color={'secondary'}
            onClick={onRemove}
            icon={<Delete/>}
            position={2}
          />
          <Fab
            onClick={this.onSave}
            icon={<Save/>}
            position={1}
          />
          <Fab
            onClick={onClose}
            icon={<Close/>}
            position={0}
          />
        </div>
      </>
    );
  }
}
