import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import InCenter from 'src/renderer/common/InCenter';
import { Grid, Grow, Paper, TextField, withStyles } from '@material-ui/core/';
import { Action, Title } from 'src/renderer/component/Accounts/common/Common';
import { AuthStep, FluxAccounts } from 'src/renderer/component/Accounts/flux/action';

const styles = theme => ({
  root: {
    height: '100%',
  },
  paper: {
    width: 400,
    height: 416,
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
    marginLeft: 10
  }
});

export namespace AuthorizationSpace {
  export interface IState {

  }

  export interface IProps {
    classes?: any;
    onClickForgotPassword: () => void;
    onCreateAccount: () => void;
    onClickNext: () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  /// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onClickForgotPassword: () => {
    dispatch(FluxAccounts.Actions.setAuthStep(AuthStep.FORGOT_PASSWORD));
  },
  onCreateAccount: () => {
    dispatch(FluxAccounts.Actions.setAuthStep(AuthStep.CREATE_ACCOUNT));
  },
  onClickNext: () => {
    dispatch(FluxAccounts.Actions.login.REQUEST());
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
class Login extends Component<AuthorizationSpace.IProps, AuthorizationSpace.IState> {

  state = {};

  render() {
    const { classes, onClickForgotPassword, onCreateAccount, onClickNext } = this.props;

    return (
      <div className={classes.root}>
        <InCenter>
          <Paper className={classes.paper}>
            <Grid container spacing={24} className={classes.root}>
              <Title title={'Sign in'} subtitle={'to continue to Emailer'}/>
              <Grow in timeout={1500}>
                <Grid item xs={12} style={{ paddingTop: 0 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="name"
                      label="Email"
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      id="name"
                      label="Password"
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </Grow>
              <Action
                onClickForgotPassword={onClickForgotPassword}
                onCreateAccount={onCreateAccount}
                onClickNext={onClickNext}
              />
            </Grid>
          </Paper>
        </InCenter>
      </div>
    );
  }
}


export default withStyles(styles)(Login as any);
