import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';
import { ButtonHotKey } from 'src/renderer/common/ButtonHotKey';

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

export namespace ConfirmationSpace {
  export interface IState {

  }

  export interface IProps {
    isOpen: boolean;
    title?: string;
    question: string;
    onSelectYes: () => void;
    onSelectNo?: () => void;
    onClose: () => void;
  }
}

export class Confirmation extends Component<ConfirmationSpace.IProps, ConfirmationSpace.IState> {

  state: ConfirmationSpace.IState = {};

  render() {
    const { question, isOpen, onClose, onSelectNo = onClose, onSelectYes, title = 'Are you sure?' } = this.props;
    if (!isOpen) {
      return <></>;
    }
    return (
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {question}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonHotKey hotKey={'Backspace'} onClick={onSelectNo} color='primary'>
            No
          </ButtonHotKey>
          <ButtonHotKey hotKey={'Enter'} onClick={onSelectYes} color='secondary'>
            Yes
          </ButtonHotKey>
        </DialogActions>
      </Dialog>
    );
  }
}
