import { ChangeEvent, Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid, Paper, TextField, WithStyles, withStyles } from '@material-ui/core/';
import { Grow } from '@material-ui/core/es';

import { Navigation, Title } from 'src/renderer/component/Accounts/common/Common';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import InCenter from 'src/renderer/common/InCenter';
import { AuthStep, FluxAccounts } from 'src/renderer/component/Accounts/flux/action';
import { TextValidator } from 'src/renderer/common/TextValidator';

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

export namespace CreateAccountSpace {
  export interface IState {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  export interface IProps {
    classes?: any;
    onClickBackToLogin?: () => void;
    onClickNex?: () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  /// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onClickBackToLogin: () => {
    dispatch(FluxAccounts.Actions.setAuthStep(AuthStep.LOGIN));
  },
  onClickNex: () => {
    //
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
class CreateAccount extends Component<CreateAccountSpace.IProps & WithStyles<any>, CreateAccountSpace.IState> {

  state = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.id as any]: event.target.value });
  }

  onError = () => {
    console.log();
  }

  render() {
    const { classes, onClickBackToLogin, onClickNex }    = this.props;
    const { userName, email, password, confirmPassword } = this.state;

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
                    value={userName}
                    onChange={this.onChange}
                    validations={{ length: { minimum: 5 } }}
                    onError={this.onError}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid container justify={'flex-end'}>
                    <TextField
                      id="email"
                      label="Email"
                      margin="normal"
                      onChange={this.onChange}
                      value={email}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="password"
                    type="password"
                    label="Password"
                    margin="normal"
                    onChange={this.onChange}
                    value={password}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid container justify={'flex-end'}>
                    <TextField
                      id="confirmPassword"
                      type="password"
                      label="Confirm password"
                      margin="normal"
                      onChange={this.onChange}
                      value={confirmPassword}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grow>
            <Navigation onBack={onClickBackToLogin} onNext={onClickNex}/>
          </Grid>
        </Paper>
      </InCenter>
    );
  }
}

export default withStyles(styles)(CreateAccount);
