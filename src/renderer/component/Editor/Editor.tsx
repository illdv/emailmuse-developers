import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  Fade,
  TextField,
  withStyles,
  Tooltip,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import { Close, Delete, Save } from '@material-ui/icons';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import {
  EditorActions,
  IEditorActions,
} from 'src/renderer/component/Editor/flux/actions';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { IEditorState } from 'src/renderer/component/Editor/flux/reducer';
import { JoditEditor } from 'src/renderer/common/Jodit/JoditEditor';
import {
  IEditEntity,
  IEditEntityParameter,
} from 'src/renderer/component/Editor/flux/interface';
import { Fab } from 'src/renderer/common/Fab';
import { firstSymbolUp } from 'src/renderer/component/Editor/utils';
import { Confirmation } from 'src/renderer/common/DialogProvider/Confirmation';

import block from 'bem-ts';

import './Editor.scss';

const b = block('editor');

export let hasEdit = false;

export const setEdit = (edit: boolean) => {
  hasEdit = edit;
};

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
// const findSourseBtn = () => document.querySelector('.jodit_toolbar_btn-source');
// let sourceBtn;
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
    prevState: EditorSpace.IState,
  ): EditorSpace.IState {
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

  componentDidMount(): void {
    hasEdit = false;
  }

  onChange = (html: string) => {
    const end = html.indexOf('</span>');
    const start = html.indexOf('none">') + 6;

    const preheder = html.substring(start, end);

    this.setState(state => ({
      ...state,
      html,
      hasChange: true,
    }));
    hasEdit = true;
  }

  onChangeField = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    this.setState(
      state =>
        ({
          ...state,
          hasChange: true,
          params: {
            ...state.params,
            [key]: value,
          },
        } as any),
    );
    hasEdit = true;
  }

  get getEntity(): IEditEntity {
    return {
      ...this.props.editor.editEntity,
      html: this.state.html,
      params: this.state.params,
    };
  }

  onRemove = () => {
    this.props.editorActions.remove.REQUEST(this.getEntity);
  }

  onSave = () => {
    this.props.editorActions.save.REQUEST(this.getEntity);
    this.setState({ hasChange: false });
    hasEdit = false;
  }

  onSaveAndClose = () => {
    this.props.editorActions.saveAndClose.REQUEST(this.getEntity);
  }

  onClose = () => {
    this.props.editorActions.close.REQUEST(this.getEntity);
  }

  renderParameters = () => {
    return Object.keys(this.state.params).map(key => {
      if (key === 'description') {
        return null;
      }
      return key === 'preheader' ? (
        <TextField
          key={key}
          className={b('text-field')}
          id={key}
          label={firstSymbolUp(key)}
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.params[key]}
          onChange={this.onChangeField(key)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <Tooltip
                  title='A preheader is the short summary text you see in your inbox after the subject line'
                  placement='top'
                >
                  <HelpIcon color='primary' />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <TextField
          key={key}
          className={b('text-field')}
          id={key}
          label={firstSymbolUp(key)}
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.params[key]}
          onChange={this.onChangeField(key)}
        />
      );
    });
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
          <JoditEditor
            onChangeValue={this.onChange}
            value={this.state.html}
            preheader={this.state.params.preheader}
          />

          <div>
            <Confirmation
              isOpen={this.state.isOpenConfirmationClose}
              onClose={this.onCloseDialogClose}
              onSelectYes={this.onClose}
              onSelectNo={this.onCloseDialogClose}
              title={'Warning'}
              question={
                'Your changes are not saved. Do you want to leave this page? Click "No" to stay.'
              }
            />
            <Confirmation
              isOpen={this.state.isOpenConfirmationDelete}
              onClose={this.onCloseDialogDelete}
              onSelectYes={this.onRemove}
              title={'Confirmation'}
              question={'Are you sure you want to delete this?'}
            />
            <Fab
              color={'secondary'}
              onClick={this.onOpenDialogDelete}
              icon={<Delete />}
              position={0}
              title={'Remove'}
            />
            <Fab
              onClick={this.onSave}
              icon={<Save />}
              position={1}
              title={'Save'}
              whitCtrl
              hotKey={'S'}
            />
            <Fab
              onClick={this.onOpenDialogClose}
              icon={<Close />}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false },
)(Editor);
