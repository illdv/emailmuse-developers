import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import Login from 'src/renderer/component/Profile/Authorisation/Login';
import ForgotPassword from 'src/renderer/component/Profile/Authorisation/ForgotPassword';
import CreateAccount from 'src/renderer/component/Profile/Authorisation/Registration';
import { Loading } from 'src/renderer/common/Loading';
import { RegistrationSuccess } from 'src/renderer/component/Profile/Authorisation/RegistrationSuccess';
import { CheckCode } from 'src/renderer/component/Profile/Authorisation/CheckCode';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { AuthStep } from 'src/renderer/component/Profile/Authorisation/flux/models';

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
      case AuthStep.REGISTRATION:
        return <CreateAccount/>;
      case AuthStep.FORGOT_PASSWORD:
        return <ForgotPassword/>;
      case AuthStep.LOADING:
        return <Loading/>;
      case AuthStep.CHECK_CODE:
        return <CheckCode/>;
      case AuthStep.REGISTRATION_SUCCESS:
        return <RegistrationSuccess/>;
      default:
        return <Login/>;
    }
  }
}
