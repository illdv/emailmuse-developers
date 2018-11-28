import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import {
  IModalWindowActions,
  ModalWindowActions,
  ModalWindowType,
} from 'src/renderer/common/DialogProvider/flux/actions';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
} from '@material-ui/core';
import InCenter from 'src/renderer/common/InCenter';
import { Check } from '@material-ui/icons';
import { HotKey } from 'src/renderer/common/HotKey/HotKey';

export namespace SelectLayoutSpace {
  export interface IState {
    folderName: string;
  }

  export interface IProps {
    modalWindowActions?: IModalWindowActions;
  }
}

class CreateFolderModal extends Component<
  SelectLayoutSpace.IProps,
  SelectLayoutSpace.IState
> {
  state: SelectLayoutSpace.IState = {
    folderName: '',
  };

  onSave = () => {
    this.state.folderName
      ? this.props.modalWindowActions.show.SUCCESS({
          type: ModalWindowType.CreateFolder,
          folderName: this.state.folderName,
        })
      : this.props.modalWindowActions.hide.REQUEST({});
  };

  handleChange = event => {
    const folderName: string = event.currentTarget.value;
    this.setState({ folderName });
  };

  onClose = () => {
    this.props.modalWindowActions.hide.REQUEST({});
  };

  render() {
    return (
      <Dialog
        open={true}
        onClose={this.onClose}
        maxWidth={'md'}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Name the folder</DialogTitle>
        <DialogContent>
          <InCenter>
            <TextField
              id='FolderName'
              label='Folder name'
              value={this.state.folderName || ''}
              onChange={this.handleChange}
              margin='normal'
              style={{ marginRight: '50px', width: '300px' }}
            />
          </InCenter>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose}>Close</Button>
          <HotKey hotKey={'Enter'} onPress={this.onSave}>
            <Button onClick={this.onSave} color='primary' variant='contained'>
              Save <Check />
            </Button>
          </HotKey>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  layout: state.layouts,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  modalWindowActions: bindModuleAction(ModalWindowActions, dispatch),
  layoutActions: bindModuleAction(LayoutActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateFolderModal);
