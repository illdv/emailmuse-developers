import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid, Grow, Paper, withStyles } from '@material-ui/core/';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import InCenter from 'src/renderer/common/InCenter';
import { Action, Title } from 'src/renderer/component/Profile/Authorisation/common/Common';
import { TextValidator } from 'src/renderer/common/Validation/TextValidator';
import { FormContext, FormValidation, IFormContext } from 'src/renderer/common/Validation/FormValidation';
import { AuthStep } from 'src/renderer/component/Profile/Authorisation/flux/models';
import { bindModuleAction } from 'src/renderer/utils';
import { ILoginRequest } from 'src/renderer/component/Profile/Authorisation/flux/interface';
import { AuthorisationActions, IAuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';

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
    margin: theme.spacing.unit,
  },
  url: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  url2: {
    paddingRight: 0,
    textAlign: 'right' as any,
    marginLeft: 10,
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

export class Login extends Component<AuthorizationSpace.IProps, AuthorizationSpace.IState> {
  state = {};

  onLoginGoogle = () => {
    this.props.action.loginInGoogle.REQUEST({});
  }

  onClickForgotPassword = () => {
    this.props.action.setAuthStep.REQUEST({ authStep: AuthStep.FORGOT_PASSWORD });
  }

  onCreateAccount = () => {
    this.props.action.setAuthStep.REQUEST({ authStep: AuthStep.REGISTRATION });
  }

  onClickNext = (request: ILoginRequest) => {
    this.props.action.login.REQUEST({ request });
  }

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

    return (
      <FormValidation
        schema={validationSchema}
        onValidationSuccessful={this.onClickNext}
      >
        <FormContext.Consumer>
          {(context: IFormContext) => (
            <div className={classes.root}>
              <InCenter>
                <Paper className={classes.paper}>
                  <Grid container spacing={24} className={classes.root}>
                    <Title title={'Sign in'} subtitle={'to continue to Emailer'}/>
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
                        <Action
                          onClickForgotPassword={this.onClickForgotPassword}
                          onCreateAccount={this.onCreateAccount}
                          onClickNext={context.onSubmit}
                          canNext={true}
                          loginGoogle={this.onLoginGoogle}
                        />
                      </Grid>
                    </Grow>
                  </Grid>
                </Paper>
              </InCenter>
            </div>
          )}
        </FormContext.Consumer>
      </FormValidation>
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));
