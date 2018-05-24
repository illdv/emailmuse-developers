import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid, Paper, WithStyles, withStyles } from '@material-ui/core/';
import { Grow } from '@material-ui/core/es';

import { Navigation, Title } from 'src/renderer/component/Authorization/common/Common';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import InCenter from 'src/renderer/common/InCenter';
import { TextValidator } from 'src/renderer/common/Validation/TextValidator';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import { FluxValidation } from 'src/renderer/common/Validation/flux/actions';
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
    validation?: FluxValidation.IState;
    onClickBackToLogin?: () => void;
    onCreateAccount?: (user: IRequest) => () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  validation: state.validation,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onClickBackToLogin: () => {
    dispatch(FluxAccounts.Actions.SetAuthStep(AuthStep.LOGIN));
  }, onCreateAccount: (user: IRequest) => () => {
    dispatch(action.Step.REQUEST(user));
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
class CreateAccount
  extends Component<CreateAccountSpace.IProps & WithStyles<'root' | 'paper'>, CreateAccountSpace.IState> {

  render() {
    const { classes, onClickBackToLogin, onCreateAccount, validation } = this.props;

    const validationSchema = {
      name: {
        presence: true, length: { minimum: 3, message: 'minimum is 3 characters' },
      }, email: {
        presence: true, email: true,
      }, password: {
        presence: true, length: { minimum: 6, message: 'minimum is 6 characters' },
      }, password_confirmation: {
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
        <Grid container className={classes.root}>
          <Title title={'Create your Emailer Account'}/>
          <Grow in timeout={1000}>
            <Grid container>
              <Grid item xs={6}>
                <TextValidator
                  id='name'
                  label='User name'
                  margin='normal'
                  schema={validationSchema.name}
                />
              </Grid>
              <Grid item xs={6}>
                <Grid container justify={'flex-end'}>
                  <TextValidator
                    id='email'
                    label='Email'
                    margin='normal'
                    schema={validationSchema.email}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  id='password'
                  type='password'
                  label='Password'
                  margin='normal'
                  schema={validationSchema.password}
                />
              </Grid>
              <Grid item xs={6}>
                <Grid container justify={'flex-end'}>
                  <TextValidator
                    id='password_confirmation'
                    type='password'
                    label='Confirm password'
                    margin='normal'
                    schema={validationSchema.password_confirmation}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grow>
          <Navigation
            onBack={onClickBackToLogin}
            onNext={onCreateAccount(validation.value as any)}
            canNext={validation.isValid}
          />
        </Grid>
      </Paper>
    </InCenter>
    );
  }
}

export default withStyles(styles)(CreateAccount);
