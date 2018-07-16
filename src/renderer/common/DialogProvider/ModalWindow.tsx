import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import Button from '@material-ui/core/Button/Button';
import block from 'bem-ts';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { Dialog, DialogActions, DialogContent, DialogTitle, Paper, PropTypes } from '@material-ui/core';
import { IModalWindowActions, ModalWindowActions } from 'src/renderer/common/DialogProvider/flux/actions';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { IModalWindowState } from 'src/renderer/common/DialogProvider/flux/reducer';

const b = block('dialog');

export interface IModalAction {
  title: string;
  onClick: () => void;
  color: PropTypes.Color;
}

export namespace SelectLayoutSpace {
  export interface IState {
  }

  export interface IProps {
    title?: string;
    actions?: IModalAction[];
    modalWindow?: IModalWindowState;
    modalWindowActions?: IModalWindowActions;
  }
}

class ModalWindow extends Component<SelectLayoutSpace.IProps, SelectLayoutSpace.IState> {

  static defaultProps: SelectLayoutSpace.IProps = {
    actions: [],
  };

  state: SelectLayoutSpace.IState = {};

  onClose = () => {
    this.props.modalWindowActions.hide.REQUEST({});
  }

  render() {
    const { children, title, actions } = this.props;

    return (
      <Dialog
        fullWidth
        className={b('')}
        open={true}
        onClose={this.onClose}
        maxWidth={'sm'}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>{title || ''}</DialogTitle>
        <Paper elevation={4}>
          <DialogContent>
            {children}
          </DialogContent>
          <DialogActions>
            {
              actions.map((action, index) => (
                <Button key={index} onClick={action.onClick} color={action.color}>
                  {action.title}
                </Button>
              ))
            }
            <Button onClick={this.onClose}>
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
