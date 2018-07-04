import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import MainLayout from 'src/renderer/component/MainLayout/MainLayout';
import Auth from 'src/renderer/component/Profile/Authorisation/Auth';

import './Application.scss';
import { Toast } from 'src/renderer/common/Toast/Toast';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { ErrorBoundary } from 'src/renderer/common/ErrorBoundary';
import PrivateRoute from 'src/renderer/common/PrivateRoute/PrivateRoute';
import { Route } from 'react-router-dom';
import Editor from 'src/renderer/component/Editor/Editor';

export namespace MainLayoutScope {

  export interface IState {
  }

  export interface IProps {
    profile?: IProfileState;
  }

}

const mapStateToProps = (state: IGlobalState) => ({
  profile: state.profile,
});

@(connect(mapStateToProps))
class Application extends React.Component<MainLayoutScope.IProps, MainLayoutScope.IState> {

  constructor(props: MainLayoutScope.IProps) {
    super(props);
  }
  render() {
    return (
      <ErrorBoundary>
        <PrivateRoute exact path='/' component={MainLayout}/>
        <Route path='/login' component={Auth} />
        <Route path='/editor' component={Editor} />
        <Toast/>
      </ErrorBoundary>
  );
  }
}

export default Application;
