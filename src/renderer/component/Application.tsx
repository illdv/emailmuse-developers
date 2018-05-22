import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { AuthorizationLayout } from 'src/renderer/component/Auth/AuthorizationLayout';
import MainLayout from 'src/renderer/component/MainLayout/MainLayout';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';

import './Application.css';
import { PreloaderLayout } from 'src/renderer/component/PreloaderLayout/PreloaderLayout';


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
    return !!token && <MainLayout/> || <AuthorizationLayout/>;
  }
}

export default Application;
