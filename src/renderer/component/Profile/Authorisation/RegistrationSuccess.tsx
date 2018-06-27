import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import PaperInCenter from 'src/renderer/component/Profile/Authorisation/common/PaperInCenter';
import { Button, Grow, Typography } from '@material-ui/core';
import { Title } from 'src/renderer/component/Profile/Authorisation/common/Common';
import InCenter from 'src/renderer/common/InCenter';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { AuthorisationActions, IAuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { bindModuleAction } from 'src/renderer/utils';
import { AuthStep } from 'src/renderer/component/Profile/Authorisation/flux/models';

export namespace RegistrationSuccessSpace {
  export interface IState {

  }

  export interface IProps {
    profile?: IProfileState;
    action?: IAuthorisationActions;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  action: bindModuleAction(AuthorisationActions, dispatch),
});

@(connect(mapStateToProps, mapDispatchToProps))
export class RegistrationSuccess
  extends Component<RegistrationSuccessSpace.IProps, RegistrationSuccessSpace.IState> {

  state = {};

  onBackLogin = () => {
    this.props.action.setAuthStep.REQUEST({authStep: AuthStep.LOGIN});
  }

  render() {
    const { profile } = this.props;
    const error        = profile.auth.error;

    const title = error ? 'Failed to create account' : 'Account has been successfully created';
    const body  = error || `A message was sent to ${profile.auth.user.email}. Check your email and follow the link.`;

    return (
      <PaperInCenter>
        <Title title={title}/>
        <Grow in timeout={1000}>
          <Typography variant='title' gutterBottom>
            {body}
          </Typography>
        </Grow>
        <InCenter>
          <Grow in timeout={1000}>
            <Button variant={'raised'} color='primary' onClick={this.onBackLogin}>
              Next
            </Button>
          </Grow>
        </InCenter>
      </PaperInCenter>
    );
  }
}
