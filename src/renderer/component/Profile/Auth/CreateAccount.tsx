import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid, Paper, WithStyles, withStyles } from '@material-ui/core/';
import { Grow } from '@material-ui/core/es';
import { bindActionCreators } from 'redux';

import { Navigation, Title } from 'src/renderer/component/Profile/Auth/common/Common';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import InCenter from 'src/renderer/common/InCenter';
import { TextValidator } from 'src/renderer/common/Validation/TextValidator';
import { ValidationActions } from 'src/renderer/common/Validation/flux/module';
import { IValidationActions, IValidationState } from 'src/renderer/common/Validation/flux/models';
import {
  createAccountActions,
  ICreateAccountRequest,
  setAuthStepAction,
} from 'src/renderer/component/Profile/Auth/flux/module';
import { AuthStep } from 'src/renderer/component/Profile/Auth/flux/models';

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
    validation?: IValidationState;
    actions?: IValidationActions;
    onClickBackToLogin?: () => void;
    onCreateAccount?: (user: ICreateAccountRequest) => () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  validation: state.validation,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onClickBackToLogin: () => {
    dispatch(setAuthStepAction(AuthStep.LOGIN));
  }, onCreateAccount: (user: ICreateAccountRequest) => () => {
    dispatch(createAccountActions.REQUEST(user));
  },
  actions: bindActionCreators({
    ...ValidationActions,
  }, dispatch),
});

@(connect(mapStateToProps, mapDispatchToProps))
class CreateAccount
  extends Component<CreateAccountSpace.IProps & WithStyles<'root' | 'paper'>, CreateAccountSpace.IState> {

  componentWillUnmount(): void {
    this.props.actions.clear();
  }

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
                    schema={validationSchema}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid container justify={'flex-end'}>
                    <TextValidator
                      id='email'
                      label='Email'
                      margin='normal'
                      schema={validationSchema}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <TextValidator
                    id='password'
                    type='password'
                    label='Password'
                    margin='normal'
                    schema={validationSchema}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid container justify={'flex-end'}>
                    <TextValidator
                      id='password_confirmation'
                      type='password'
                      label='Confirm password'
                      margin='normal'
                      schema={validationSchema}
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
