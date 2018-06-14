import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';

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
    const { question, isOpen, onClose, onSelectNo = onClose, onSelectYes, title = 'Confirmation' } = this.props;
    return (
      <Dialog
        open={isOpen}
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
          <Button onClick={onSelectNo} color='primary'>
            No
          </Button>
          <Button onClick={onSelectYes} color='secondary'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
