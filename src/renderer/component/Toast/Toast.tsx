import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Fade, Snackbar } from '@material-ui/core';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { FluxToast, ToastType } from 'src/renderer/component/Toast/flux/actions';
import './Toast.scss';

const style = {
  [ToastType.Success]: 'toast_success',
  [ToastType.Info]: 'toast_info',
  [ToastType.Warning]: 'toast_warning',
  [ToastType.Error]: 'toast_error',
};

export namespace ToastSpace {
  export interface IState {

  }

  export interface IProps {
    onLoadingMail?: (error) => void;
    toast?: FluxToast.IState;
    showToast?: (error: string) => void;
    clear?: () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  toast: state.toast,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  clear: () => {
    dispatch(FluxToast.Actions.clear());
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
export class Toast extends Component<ToastSpace.IProps, ToastSpace.IState> {
  handleClose = () => {
    this.props.clear();
  }

  render() {
    const { messages, isOpen, type } = this.props.toast;

    return (
      <div>
        <Snackbar
          open={isOpen}
          onClose={this.handleClose}
          TransitionComponent={Fade}
          ContentProps={{
            'aria-describedby': 'message-id',
            'classes': {
              root: `.toast ${style[type]}`,
            },
          }}
          message={<span id='message-id'>{messages}</span>}
        />
      </div>
    );
  }
}
