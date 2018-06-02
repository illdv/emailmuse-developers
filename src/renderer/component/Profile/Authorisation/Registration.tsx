import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid, Grow, Paper, WithStyles, withStyles } from '@material-ui/core/';

import { Navigation, Title } from 'src/renderer/component/Profile/Authorisation/common/Common';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import InCenter from 'src/renderer/common/InCenter';
import { TextValidator } from 'src/renderer/common/Validation/TextValidator';
import { FormContext, FormValidation, IFormContext } from 'src/renderer/common/Validation/FormValidation';
import {
  createAccountActions,
  ICreateAccountRequest,
  setAuthStepAction,
} from 'src/renderer/component/Profile/Authorisation/flux/module';
import { AuthStep } from 'src/renderer/component/Profile/Authorisation/flux/models';

const styles = () => ({
  root: {
    height: '100%',
  },
  paper: {
    width: 550,
    height: 350,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 48,
    paddingBottom: 26,
  },
});

export namespace RegistrationSpace {
  export interface IState {
  }

  export interface IProps {
    onClickBackToLogin?: () => void;
    onCreateAccount?: (user: ICreateAccountRequest) => () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onClickBackToLogin: () => {
    dispatch(setAuthStepAction(AuthStep.LOGIN));
  }, onCreateAccount: (user: ICreateAccountRequest) => {
    dispatch(createAccountActions.REQUEST(user));
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
class Registration
  extends Component<RegistrationSpace.IProps & WithStyles<'root' | 'paper'>, RegistrationSpace.IState> {

  render() {
    const { classes, onClickBackToLogin, onCreateAccount } = this.props;

    const validationSchema = {
      name: {
        presence: true, length: { minimum: 3, message: 'minimum is 3 characters' },
      },
      email: {
        presence: true, email: true,
      },
      password: {
        presence: true, length: { minimum: 6, message: 'minimum is 6 characters' },
      },
      password_confirmation: {
        presence: true, length: { minimum: 6, message: 'minimum is 6 characters' }, equality: {
          attribute: 'password',
          message: 'Passwords didn\'t match.',
          comparator: (password, confirmPassword) => password === confirmPassword,
        },
      },
    };

    return (
      <InCenter>
        <Paper square className={classes.paper}>
          <FormValidation onValidationSuccessful={onCreateAccount} schema={validationSchema}>
            <Grid container className={classes.root}>
              <Title title={'Create your Emailer Account'}/>
              <Grow in timeout={1000}>
                <Grid container>
                  <Grid item xs={6}>
                    <TextValidator
                      id='name'
                      label='User name'
                      margin='normal'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container justify={'flex-end'}>
                      <TextValidator
                        id='email'
                        label='Email'
                        margin='normal'
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <TextValidator
                      id='password'
                      type='password'
                      label='Password'
                      margin='normal'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container justify={'flex-end'}>
                      <TextValidator
                        id='password_confirmation'
                        type='password'
                        label='Confirm password'
                        margin='normal'
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grow>
              <FormContext.Consumer>
                {(context: IFormContext) => (
                  <Navigation
                    onBack={onClickBackToLogin}
                    onNext={context.onSubmit}
                    canNext={true}
                  />
                )}
              </FormContext.Consumer>
            </Grid>
          </FormValidation>
        </Paper>
      </InCenter>
    );
  }
}

export default withStyles(styles)(Registration);
