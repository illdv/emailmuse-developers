import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import Login from 'src/renderer/component/Authorization/Login';
import ForgotPassword from 'src/renderer/component/Authorization/ForgotPassword';
import CreateAccount from 'src/renderer/component/Authorization/CreateAccount';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import { Loading } from 'src/renderer/common/Loading';
import { CreateAccountSuccess } from 'src/renderer/component/Authorization/CreateAccountSuccess';
import { CheckCode } from 'src/renderer/component/Authorization/CheckCode';
import AuthStep = FluxAccounts.Models.AuthStep;

export namespace AuthorizationLayoutSpace {
  export interface IState {

  }

  export interface IProps {
    accounts?: any;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  accounts: state.accounts,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

@(connect(mapStateToProps, mapDispatchToProps))
export class Layout extends Component<AuthorizationLayoutSpace.IProps, AuthorizationLayoutSpace.IState> {

  state = {};

  render() {
    const { authStep } = this.props.accounts;

    switch (authStep) {
      case AuthStep.CREATE_ACCOUNT:
        return <CreateAccount/>;
      case AuthStep.FORGOT_PASSWORD:
        return <ForgotPassword/>;
      case AuthStep.LOADING:
        return <Loading/>;
      case AuthStep.CHECK_CODE:
        return <CheckCode/>;
      case AuthStep.CREATE_ACCOUNT_SUCCESS:
        return <CreateAccountSuccess/>;
      default:
        return <Login/>;
    }
  }
}
