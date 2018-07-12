import { Component } from 'react';
import * as React from 'react';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { connect, Dispatch } from 'react-redux';

export namespace PollsSpace {
  export interface IState {

  }

  export interface IProps {

  }
}

export class Polls extends Component<PollsSpace.IProps, PollsSpace.IState> {

  state: PollsSpace.IState = {};

  render() {
    return (
      <h1>Hello Polls</h1>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  /// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  /*
    onLoadingMail: () => {
     dispatch(Mail.Actions.onLoadingMail.REQUEST());
   },
  */
});
