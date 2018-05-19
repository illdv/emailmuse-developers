import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { AuthorizationLayout } from 'src/renderer/component/Accounts/AuthorizationLayout';
import MainLayout from 'src/renderer/component/MainLayout/MainLayout';
import { FluxAccounts } from 'src/renderer/component/Accounts/flux/FluxAccounts';

import './Application.css';


export namespace MainLayoutScope {

  export interface IState {
  }

  export interface IProps {
    accounts?: FluxAccounts.IState;
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
    const { token } = this.props.accounts;
    return !!token && <MainLayout/> || <AuthorizationLayout/>;
  }
}

export default Application;
