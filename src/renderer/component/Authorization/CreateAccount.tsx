import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid, Grow, Paper, WithStyles, withStyles } from '@material-ui/core/';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import InCenter from 'src/renderer/common/InCenter';
import { Navigation, Title } from 'src/renderer/component/Authorization/common/Common';
import { TextValidator } from 'src/renderer/common/Validation/TextValidator';
import { FormValidation, IFormContext, FormContext } from 'src/renderer/common/Validation/FormValidation';
import action = FluxAccounts.Actions.CreateAccount;
import IRequest = action.IRequest;
import AuthStep = FluxAccounts.Models.AuthStep;

const styles = () => ({
  root: {
    height: '100%',
  }, paper: {
    width: 500, height: 300, paddingLeft: 40, paddingRight: 40, paddingTop: 48, paddingBottom: 26,
  },
});

export namespace CreateAccountSpace {
  export interface IState {
  }

  export interface IProps {
    onClickBackToLogin?: () => void;
    onCreateAccount?: (user: IRequest) => () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onClickBackToLogin: () => {
    dispatch(FluxAccounts.Actions.SetAuthStep(AuthStep.LOGIN));
  }, onCreateAccount: (user: IRequest) => {
    dispatch(action.Step.REQUEST(user));
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
class CreateAccount
  extends Component<CreateAccountSpace.IProps & WithStyles<'root' | 'paper'>, CreateAccountSpace.IState> {

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
  )
    ;
  }
}

export default withStyles(styles)(CreateAccount);
