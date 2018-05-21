import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { AuthStep, FluxAuth } from 'src/renderer/component/Auth/flux/action';
import Login from 'src/renderer/component/Auth/Login';
import ForgotPassword from 'src/renderer/component/Auth/ForgotPassword';
import CreateAccount from 'src/renderer/component/Auth/CreateAccount';

export namespace AuthorizationLayoutSpace {
  export interface IState {

  }

  export interface IProps {
    accounts?: FluxAuth.IState;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  accounts: state.accounts
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  /*
    onLoadingMail: () => {
     dispatch(Mail.Actions.onLoadingMail.REQUEST());
   },
  */
});

@(connect(mapStateToProps, mapDispatchToProps))
export class AuthorizationLayout extends Component<AuthorizationLayoutSpace.IProps, AuthorizationLayoutSpace.IState> {

  state = {};

  render() {
    const {authStep} = this.props.accounts;

    switch (authStep) {
      case AuthStep.CREATE_ACCOUNT:
        return <CreateAccount/>;
      case AuthStep.FORGOT_PASSWORD:
        return <ForgotPassword/>;
      default:
        return <Login/>;
    }
  }
}
