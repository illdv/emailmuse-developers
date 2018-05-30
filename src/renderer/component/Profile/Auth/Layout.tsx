import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import Login from 'src/renderer/component/Profile/Auth/Login';
import ForgotPassword from 'src/renderer/component/Profile/Auth/ForgotPassword';
import CreateAccount from 'src/renderer/component/Profile/Auth/CreateAccount';
import { Loading } from 'src/renderer/common/Loading';
import { CreateAccountSuccess } from 'src/renderer/component/Profile/Auth/CreateAccountSuccess';
import { CheckCode } from 'src/renderer/component/Profile/Auth/CheckCode';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { AuthStep } from 'src/renderer/component/Profile/Auth/flux/models';

export namespace AuthorizationLayoutSpace {
  export interface IState {

  }
  export interface IProps {
    profile?: IProfileState;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

@(connect(mapStateToProps, mapDispatchToProps))
export class Layout extends Component<AuthorizationLayoutSpace.IProps, AuthorizationLayoutSpace.IState> {

  state = {};

  render() {
    const { authStep } = this.props.profile.auth;

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
