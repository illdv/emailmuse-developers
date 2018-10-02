import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import MainLayout from 'src/renderer/component/MainLayout/MainLayout';
import Auth from 'src/renderer/component/Profile/Authorisation/Auth';

import './Application.scss';
import Toast from 'src/renderer/common/Toast/Toast';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { ErrorBoundary } from 'src/renderer/common/ErrorBoundary';
import PrivateRoute from 'src/renderer/common/PrivateRoute/PrivateRoute';
import { Route, Switch as SwitchRoute } from 'react-router-dom';
import Polls from 'src/renderer/component/Profile/Polls/Polls';
import { AuthorisationActions, IAuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';

export namespace MainLayoutScope {
  export interface IState {
  }

  export interface IProps {
    profile?: IProfileState;
    actionAuthorisation: IAuthorisationActions;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actionAuthorisation: bindModuleAction(AuthorisationActions, dispatch),
});

@(connect(mapStateToProps))
class Application extends React.Component<MainLayoutScope.IProps, MainLayoutScope.IState> {

  constructor(props: MainLayoutScope.IProps) {
    super(props);
  }

  componentDidMount() {
    this.props.actionAuthorisation.initializeApp.REQUEST({});
  }

  render() {
    return (
      <ErrorBoundary>
        <SwitchRoute>
          <Route path='/login' component={Auth}/>
          <Route path='/polls' component={Polls}/>
          <PrivateRoute path='/' component={MainLayout}/>
        </SwitchRoute>
        <Toast/>
      </ErrorBoundary>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
(Application);
