import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import Button from '@material-ui/core/Button/Button';
import block from 'bem-ts';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { Dialog, DialogActions, DialogContent, Paper } from '@material-ui/core';
import { IModalWindowActions, ModalWindowActions, ModalWindowType } from 'src/renderer/common/ModalWindow/flux/actions';
import { bindModuleAction } from 'src/renderer/utils';
import { IModalWindowState } from 'src/renderer/common/ModalWindow/flux/reducer';

const b = block('dialog');

export namespace SelectLayoutSpace {
  export interface IState {
  }

  export interface IProps {
    type: ModalWindowType;
    modalWindow?: IModalWindowState;
    modalWindowActions?: IModalWindowActions;
  }
}

class ModalWindow extends Component<SelectLayoutSpace.IProps, SelectLayoutSpace.IState> {

  state: SelectLayoutSpace.IState = {};

  onClose = () => {
    this.props.modalWindowActions.hide.REQUEST({ type: null });
  }

  render() {
    const { children } = this.props;
    return (
      <Dialog
        fullWidth
        className={b('')}
        open={true}
        onClose={this.onClose}
        maxWidth={'sm'}
        aria-labelledby='responsive-dialog-title'
      >
        <Paper elevation={4}>
          <DialogContent>
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onClose} color='secondary'>
              Close
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  modalWindow: state.modalWindow,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  modalWindowActions: bindModuleAction(ModalWindowActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
