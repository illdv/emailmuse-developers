import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Fade, Snackbar } from '@material-ui/core';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { FluxToast } from 'src/renderer/component/Toast/flux/actions';

export namespace ToastSpace {
  export interface IState {

  }

  export interface IProps {
    onLoadingMail?: (error) => void;
    toast?: FluxToast.IState;
    setError?: (error: string) => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  toast: state.toast
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setError: (error) => {
    dispatch(FluxToast.Actions.setError(error));
  }
});

@(connect(mapStateToProps, mapDispatchToProps))
export class Toast extends Component<ToastSpace.IProps, ToastSpace.IState> {
  handleClose = () => {
    this.props.setError('');
  }

  render() {
    const { error } = this.props.toast;
    return (
      <div>
        <Snackbar
          open={error !== ''}
          onClose={this.handleClose}
          TransitionComponent={Fade}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{error}</span>}
        />
      </div>
    );
  }
}
