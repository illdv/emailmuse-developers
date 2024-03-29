import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import Login from 'src/renderer/component/Profile/Authorisation/Login';
import ForgotPassword from 'src/renderer/component/Profile/Authorisation/ForgotPassword';
import SignUp from 'src/renderer/component/Profile/Authorisation/SignUp';
import { Loading } from 'src/renderer/common/Loading';
import { RegistrationSuccess } from 'src/renderer/component/Profile/Authorisation/RegistrationSuccess';
import { CheckCode } from 'src/renderer/component/Profile/Authorisation/CheckCode';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { AuthStep } from 'src/renderer/component/Profile/Authorisation/flux/models';
import PreLogin from 'src/renderer/component/Profile/Authorisation/PreLogin';
import PreCreateAccount from 'src/renderer/component/Profile/Authorisation/PreCreateAccount';

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

export class Auth extends Component<AuthorizationLayoutSpace.IProps, AuthorizationLayoutSpace.IState> {

  state = {};

  render() {
    const { authStep } = this.props.profile.auth;

    switch (authStep) {
      case AuthStep.REGISTRATION:
        return <SignUp/>;
      case AuthStep.FORGOT_PASSWORD:
        return <ForgotPassword/>;
      case AuthStep.LOADING:
        return <Loading/>;
      case AuthStep.CHECK_CODE:
        return <CheckCode/>;
      case AuthStep.REGISTRATION_SUCCESS:
        return <RegistrationSuccess/>;
      case AuthStep.LOGIN_WITH_EMAIL:
        return <Login/>;
      case AuthStep.PRE_SIGN_UP:
        return <PreCreateAccount/>;
      case AuthStep.PRE_LOGIN:
        return <PreLogin/>;
      default:
        return <PreLogin/>;
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
