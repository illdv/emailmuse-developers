import { ChangeEvent, Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid, Paper, TextField, WithStyles, withStyles } from '@material-ui/core/';
import { Grow } from '@material-ui/core/es';

import { Navigation, Title } from 'src/renderer/component/Accounts/common/Common';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import InCenter from 'src/renderer/common/InCenter';
import { AuthStep, FluxAccounts, ICreateAccountModel } from 'src/renderer/component/Accounts/flux/action';
import { TextValidator } from 'src/renderer/common/TextValidator';
import * as validate from 'validate.js';

const styles = theme => ({
  root: {
    height: '100%',
  },
  paper: {
    width: 500,
    height: 300,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 48,
    paddingBottom: 26,
  }
});

function useOrDefault(func: () => any, defaultValue: string) {
  try {
    return func();
  } catch (e) {
    return defaultValue;
  }
}

export namespace CreateAccountSpace {
  export interface IState {
    user: ICreateAccountModel;
    isBeBlur: boolean;
  }

  export interface IProps {
    classes?: any;
    onClickBackToLogin?: () => void;
    onCreateAccount?: (user: ICreateAccountModel) => () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  /// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onClickBackToLogin: () => {
    dispatch(FluxAccounts.Actions.setAuthStep(AuthStep.LOGIN));
  },
  onCreateAccount: (user: ICreateAccountModel) => () => {
    dispatch(FluxAccounts.Actions.createAccount.REQUEST(user));
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
class CreateAccount extends Component<CreateAccountSpace.IProps & WithStyles<any>, CreateAccountSpace.IState> {

  state = {
    user: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    isBeBlur: false,
  };

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.id as any]: event.target.value
      }
    });
  }

  render() {
    const { classes, onClickBackToLogin, onCreateAccount } = this.props;
    const { user }                                  = this.state;


    const validationSchema = {
      userName: {
        length: { minimum: 3 }
      },
      email: {
        email: true
      },
      password: {
        length: { minimum: 6 }
      },
      confirmPassword: {
        length: { minimum: 6 },
        equality: {
          attribute: 'password',
          message: 'Those passwords didn\'t match. Try again',
          comparator: (password, confirmPassword) => password === confirmPassword,
        }
      },
    };

    const validationError = validate(user, validationSchema);

    const validationSuccesses = validationError !== undefined;


    return (
      <InCenter>
        <Paper square className={classes.paper}>
          <Grid container className={classes.root}>
            <Title title={'Create your Emailer Account'}/>
            <Grow in timeout={1000}>
              <Grid container>
                <Grid item xs={6}>
                  <TextValidator
                    id="userName"
                    label="User name"
                    margin="normal"
                    value={user.userName}
                    onChange={this.onChange}
                    validationError={useOrDefault(() => (validationError.userName[0]), '')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid container justify={'flex-end'}>
                    <TextValidator
                      id="email"
                      label="Email"
                      margin="normal"
                      onChange={this.onChange}
                      value={user.email}
                      validationError={useOrDefault(() => (validationError.email[0]), '')}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <TextValidator
                    id="password"
                    type="password"
                    label="Password"
                    margin="normal"
                    onChange={this.onChange}
                    value={user.password}
                    validationError={useOrDefault(() => (validationError.password[0]), '')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid container justify={'flex-end'}>
                    <TextValidator
                      id="confirmPassword"
                      type="password"
                      label="Confirm password"
                      margin="normal"
                      onChange={this.onChange}
                      value={user.confirmPassword}
                      validationError={useOrDefault(() => (validationError.confirmPassword[0]), '')}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grow>
            <Navigation onBack={onClickBackToLogin} onNext={onCreateAccount(user)} canNext={validationSuccesses}/>
          </Grid>
        </Paper>
      </InCenter>
    );
  }
}

export default withStyles(styles)(CreateAccount);
