import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { AuthorizationLayout } from 'src/renderer/component/Auth/AuthorizationLayout';

import './Application.css';
import { FluxAuth } from 'src/renderer/component/Auth/flux/action';
import MainLayout from 'src/renderer/component/MainLayout/MainLayout';


export namespace MainLayoutScope {

  export interface IState {
  }

  export interface IProps {
    accounts?: FluxAuth.IState;
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
