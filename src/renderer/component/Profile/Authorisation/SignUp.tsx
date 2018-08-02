import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Grid, Grow, Paper, withStyles } from '@material-ui/core/';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import InCenter from 'src/renderer/common/InCenter';
import { Title } from 'src/renderer/component/Profile/Authorisation/common/Common';
import { TextValidator } from 'src/renderer/common/Validation/TextValidator';
import { FormContext, FormValidation, IFormContext } from 'src/renderer/common/Validation/FormValidation';
import { AuthStep } from 'src/renderer/component/Profile/Authorisation/flux/models';
import { ICreateAccountRequest } from 'src/renderer/component/Profile/Authorisation/flux/interface';
import { AuthorisationActions, IAuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { ChevronLeft } from '@material-ui/icons';

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
  signUpButton: {
    'padding': theme.spacing.unit,
    'text-transform': 'none',
  },
});

export namespace AuthorizationSpace {

  export interface IState {
  }

  export interface IProps {
    classes?: any;
    action?: IAuthorisationActions;
  }
}

const mapStateToProps = (state: IGlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  action: bindModuleAction(AuthorisationActions, dispatch),
});

export class SignUp extends Component<AuthorizationSpace.IProps, AuthorizationSpace.IState> {
  state = {};

  onCreateAccount = (user: ICreateAccountRequest) => {
    user.name = 'new user';
    this.props.action.createAccount.REQUEST({ user });
  }

  onBack = () => {
    this.props.action.setAuthStep.REQUEST({ authStep: AuthStep.PRE_LOGIN });
  }

  render() {
    const { classes } = this.props;

    const validationSchema = {
      email: {
        presence: true, email: true,
      },
      password: {
        presence: true, length: { minimum: 6, message: 'minimum is 6 characters' },
      },
      password_confirmation: {
        presence: true, length: { minimum: 6, message: 'minimum is 6 characters' },
        equality: {
          attribute: 'password',
          message: 'Passwords didn\'t match.',
          comparator: (password, confirmPassword) => password === confirmPassword,
        },
      },
    };

    return (
      <FormValidation
        schema={validationSchema}
        onValidationSuccessful={this.onCreateAccount}
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
                      ><ChevronLeft/> Back
                      </div>
                    </Grow>
                    <Grid container spacing={24} className={classes.root}>
                      <Title title={'Sign up'}/>
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
                            <TextValidator
                              id='password_confirmation'
                              type='password'
                              label='Confirm password'
                              margin='normal'
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              color='primary'
                              variant='contained'
                              onClick={context.onSubmit}
                              className={classes.signUpButton}
                              size='large'
                            >Register
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
  connect(mapStateToProps, mapDispatchToProps)
  (SignUp));
