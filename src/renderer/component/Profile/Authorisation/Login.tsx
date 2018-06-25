import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid, Grow, Paper, withStyles } from '@material-ui/core/';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import InCenter from 'src/renderer/common/InCenter';
import { Action, Title } from 'src/renderer/component/Profile/Authorisation/common/Common';
import { TextValidator } from 'src/renderer/common/Validation/TextValidator';
import { FormContext, FormValidation, IFormContext } from 'src/renderer/common/Validation/FormValidation';
import {
  ILoginRequest,
  loginActions,
  setAuthStepAction,
} from 'src/renderer/component/Profile/Authorisation/flux/module';
import { AuthStep } from 'src/renderer/component/Profile/Authorisation/flux/models';

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
    onClickForgotPassword: () => void;
    onCreateAccount: () => void;
    onClickNext: (request: ILoginRequest) => () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onClickForgotPassword: () => {
    dispatch(setAuthStepAction(AuthStep.FORGOT_PASSWORD));
  },
  onCreateAccount: () => {
    dispatch(setAuthStepAction(AuthStep.REGISTRATION));
  },
  onClickNext: (request: ILoginRequest) => {
    dispatch(loginActions.REQUEST(request));
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
class Login extends Component<AuthorizationSpace.IProps, AuthorizationSpace.IState> {
  state = {};

  render() {
    const { classes, onClickForgotPassword, onCreateAccount, onClickNext } = this.props;

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
        onValidationSuccessful={onClickNext}
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
                          onClickForgotPassword={onClickForgotPassword}
                          onCreateAccount={onCreateAccount}
                          onClickNext={context.onSubmit}
                          canNext={true}
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

export default withStyles(styles)(Login as any);