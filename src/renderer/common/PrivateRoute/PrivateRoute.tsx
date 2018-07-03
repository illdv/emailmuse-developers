import * as React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';

interface IPrivateRoute {
  component: React.ReactType;
  profile: IProfileState;
}

const PrivateRoute: React.SFC<IPrivateRoute> = ({ component: Component, profile, ...rest }) => {
  const { token } = profile.auth.user;
  const check = props => (
    token
      ? <Component {...props} />
      : <Redirect to='/login'/>
  );
  return (
    <Route {...rest} render={check}/>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, null)(PrivateRoute);
