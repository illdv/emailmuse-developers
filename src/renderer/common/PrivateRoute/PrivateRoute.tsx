import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { useOrDefault } from 'src/renderer/utils';

interface IPrivateRoute {
  component: React.ReactType;
  profile: IProfileState;
}

const PrivateRoute: React.SFC<IPrivateRoute> = ({ component: Component, profile, ...rest }) => {
  const token = useOrDefault(() => profile.auth.user, null);
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
