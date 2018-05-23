import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import PaperInCenter from 'src/renderer/component/Authorization/common/PaperInCenter';
import { Button, Grow, Typography } from '@material-ui/core';
import { Title } from 'src/renderer/component/Authorization/common/Common';
import InCenter from 'src/renderer/common/InCenter';

export namespace CreateAccountSuccessSpace {
  export interface IState {

  }

  export interface IProps {
    accounts?: FluxAccounts.IState;
    onBackLogin?: () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  accounts: state.accounts
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onBackLogin: () => {
    dispatch(FluxAccounts.Actions.SetAuthStep(FluxAccounts.Models.AuthStep.LOGIN));
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
export class CreateAccountSuccess extends Component<CreateAccountSuccessSpace.IProps, CreateAccountSuccessSpace.IState> {

  state = {};

  render() {
    const { accounts } = this.props;
    const error        = accounts.error;

    const title = error ? 'Failed create account' : 'Create account success';
    const body  = error || `A message was sent to ${accounts.user.email}. Check your email and follow the link.`;

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
            <Button variant={'raised'} color='primary' onClick={this.props.onBackLogin}>
              Next
            </Button>
          </Grow>
        </InCenter>
      </PaperInCenter>
    );
  }
}
