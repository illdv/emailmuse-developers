import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Grid, Grow, Paper, withStyles } from '@material-ui/core/';
import { Redirect } from 'react-router-dom';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import InCenter from 'src/renderer/common/InCenter';
import {
  Action,
  Title,
} from 'src/renderer/component/Profile/Authorisation/common/Common';
import { TextValidator } from 'src/renderer/common/Validation/TextValidator';
import {
  FormContext,
  FormValidation,
  IFormContext,
} from 'src/renderer/common/Validation/FormValidation';
import { AuthStep } from 'src/renderer/component/Profile/Authorisation/flux/models';
import { ILoginRequest } from 'src/renderer/component/Profile/Authorisation/flux/interface';
import {
  AuthorisationActions,
  IAuthorisationActions,
} from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { ChevronLeft } from '@material-ui/icons';
import { HotKey } from 'src/renderer/common/HotKey/HotKey';

const styles = theme => ({
  root: {
    height: '100%',
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

const mapStateToProps = (state: IGlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  action: bindModuleAction(AuthorisationActions, dispatch),
});

export class Login extends Component<
  AuthorizationSpace.IProps,
  AuthorizationSpace.IState
> {
  state = {};

  onClickForgotPassword = () => {
    this.props.action.setAuthStep.REQUEST({
      authStep: AuthStep.FORGOT_PASSWORD,
    });
  };

  onCreateAccount = () => {
    this.props.action.setAuthStep.REQUEST({ authStep: AuthStep.REGISTRATION });
  };

  onSignIn = (request: ILoginRequest) => {
    this.props.action.login.REQUEST({ request });
  };

  onBack = () => {
    this.props.action.setAuthStep.REQUEST({ authStep: AuthStep.PRE_LOGIN });
  };

  render() {
    const { classes } = this.props;

    const validationSchema = {
      email: {
        presence: true,
        email: true,
      },
      password: {
        presence: true,
        length: { minimum: 6 },
      },
    };

    const defaultValue = IS_PRODUCTION
      ? {}
      : {
          email: 'illdv@mail.ru',
          password: '123456',
        };

    return (
      <FormValidation
        schema={validationSchema}
        onValidationSuccessful={this.onSignIn}
        defaultValue={defaultValue}
      >
        <FormContext.Consumer>
          {(context: IFormContext) => (
            <div className={classes.root}>
              <InCenter>
                <Paper className={classes.paper}>
                  <div style={{ position: 'relative' }}>
                    <Grow in timeout={1500}>
                      <div
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          position: 'absolute',
                          top: '-15px',
                          left: '-20px',
                        }}
                        onClick={this.onBack}
                      >
                        <ChevronLeft /> Back
                      </div>
                    </Grow>
                    <Grid container spacing={24} className={classes.root}>
                      <Title title={'Sign in'} />
                      <Grow in timeout={1500}>
                        <Grid item xs={12} style={{ paddingTop: 0 }}>
                          <Grid item xs={12}>
                            <TextValidator
                              fullWidth
                              id='email'
                              label='Email'
                              margin='dense'
                            />
                            <TextValidator
                              fullWidth
                              id='password'
                              label='Password'
                              type='password'
                              margin='dense'
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <HotKey hotKey={'Enter'} onPress={context.onSubmit}>
                              <Button
                                color='primary'
                                variant='contained'
                                onClick={context.onSubmit}
                                className={classes.signButton}
                                size='large'
                              >
                                Sign In
                              </Button>
                            </HotKey>
                          </Grid>
                          <Grid container justify={'space-around'}>
                            <Button
                              className={classes.button}
                              onClick={this.onCreateAccount}
                              style={{ marginTop: 110 }}
                            >
                              Create an account
                            </Button>
                            <Button
                              className={classes.button}
                              onClick={this.onClickForgotPassword}
                              style={{ marginTop: 110 }}
                            >
                              Recover your password
                            </Button>
                          </Grid>
                        </Grid>
                      </Grow>
                    </Grid>
                  </div>
                </Paper>
              </InCenter>
            </div>
          )}
        </FormContext.Consumer>
      </FormValidation>
    );
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login),
);
