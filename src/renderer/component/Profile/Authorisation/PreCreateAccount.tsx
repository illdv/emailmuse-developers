import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  Button,
  Grid,
  Grow,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import InCenter from 'src/renderer/common/InCenter';
import {
  FormContext,
  FormValidation,
  IFormContext,
} from 'src/renderer/common/Validation/FormValidation';
import {
  AuthStep,
  IUser,
} from 'src/renderer/component/Profile/Authorisation/flux/models';
import { ILoginRequest } from 'src/renderer/component/Profile/Authorisation/flux/interface';
import {
  AuthorisationActions,
  IAuthorisationActions,
} from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';

import block from 'bem-ts';
import { Title } from 'src/renderer/component/Profile/Authorisation/common/Common';

const b = block('layout');

const styles = theme => ({
  root: {
    height: '100%',
  },
  container: {
    flexGrow: 1,
  },
  paper: {
    width: 430,
    height: 446,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 48,
    paddingBottom: 26,
  },
  button: {
    'padding': theme.spacing.unit - 3,
    'text-transform': 'none',
  },
  signButton: {
    'padding': theme.spacing.unit,
    'text-transform': 'none',
  },
});

export namespace AuthorizationSpace {
  export interface IState {}

  export interface IProps {
    classes?: any;
    action?: IAuthorisationActions;
  }
}

export class PreCreateAccount extends Component<
  AuthorizationSpace.IProps,
  AuthorizationSpace.IState
> {
  state = {};

  onLoginGoogle = () => {
    this.props.action.loginInGoogle.REQUEST({});
  }

  onCreateAccount = () => {
    this.props.action.setAuthStep.REQUEST({ authStep: AuthStep.REGISTRATION });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <InCenter>
          <Paper className={classes.paper}>
            <Grid container>
              <Title title={'Create Your Account'} />
              <Grow in timeout={1000}>
                <>
                  <Grid item xs={12} style={{ marginTop: 80 }}>
                    <Button
                      color='primary'
                      variant='contained'
                      onClick={this.onLoginGoogle}
                      className={classes.signButton}
                      size='large'
                    >
                      Sign In with Google
                    </Button>
                  </Grid>
                  <Grid
                    container
                    direction={'column'}
                    justify={'space-around'}
                    alignItems={'flex-start'}
                    className={classes.root}
                  >
                    <Button
                      className={classes.button}
                      onClick={this.onCreateAccount}
                      style={{ marginTop: 120 }}
                    >
                      Or sign up with email and password
                    </Button>
                  </Grid>
                </>
              </Grow>
            </Grid>
          </Paper>
        </InCenter>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  action: bindModuleAction(AuthorisationActions, dispatch),
});

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps,
  )(PreCreateAccount),
);
