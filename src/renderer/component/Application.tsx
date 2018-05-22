import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { AuthorizationLayout } from 'src/renderer/component/Auth/AuthorizationLayout';
import MainLayout from 'src/renderer/component/MainLayout/MainLayout';

import './Application.css';
import { Toast } from 'src/renderer/component/Toast/Toast';


export namespace MainLayoutScope {

  export interface IState {
  }

  export interface IProps {
    accounts?: any;
  }

}

const mapStateToProps = (state: IGlobalState) => ({
  accounts: state.accounts,
});


@(connect(mapStateToProps))
class Application extends React.Component<MainLayoutScope.IProps, MainLayoutScope.IState> {

  constructor(props: MainLayoutScope.IProps) {
    super(props);

    this.state = {
      layouts: [],
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  render() {
    const { token } = this.props.accounts.user;
    return (
    <>
      {!!token && <MainLayout/> || <AuthorizationLayout/>}
      <Toast/>
    </>
  );
  }
}

export default Application;
