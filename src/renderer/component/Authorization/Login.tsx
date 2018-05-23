import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import InCenter from 'src/renderer/common/InCenter';
import { Grid, Grow, Paper, withStyles } from '@material-ui/core/';
import { Action, Title } from 'src/renderer/component/Authorization/common/Common';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import { TextValidator } from 'src/renderer/component/Validation/TextValidator';
import { FluxValidation } from 'src/renderer/component/Validation/flux/actions';
import { bindActionCreators } from 'redux';
import AuthStep = FluxAccounts.Models.AuthStep;
import IRequest = FluxAccounts.Actions.Login.IRequest;

const styles = (theme) => ({
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
    marginLeft: 10,
  },
});

export namespace AuthorizationSpace {

  export interface IState {

  }

  export interface IProps {
    classes?: any;
    validation: FluxValidation.IState;
    onClickForgotPassword: () => void;
    onCreateAccount: () => void;
    onClickNext: (request: IRequest) => () => void;
    actions?: FluxValidation.Actions.IAllAction;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  validation: state.validation,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onClickForgotPassword: () => {
    dispatch(FluxAccounts.Actions.SetAuthStep(AuthStep.FORGOT_PASSWORD));
  },
  onCreateAccount: () => {
    dispatch(FluxAccounts.Actions.SetAuthStep(AuthStep.CREATE_ACCOUNT));
  },
  onClickNext: (request: IRequest) => () => {
    dispatch(FluxAccounts.Actions.Login.Step.REQUEST(request));
  },
  actions: bindActionCreators({
    ...FluxValidation.Actions.AllAction,
  }, dispatch),
});

@(connect(mapStateToProps, mapDispatchToProps))
class Login extends Component<AuthorizationSpace.IProps, AuthorizationSpace.IState> {
  state = {};

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.validation.isValid !== this.props.validation.isValid;
  }

  componentWillUnmount(): void {
    this.props.actions.initScheme();
  }

  render() {
    const { classes, onClickForgotPassword, onCreateAccount, onClickNext, validation } = this.props;

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
      <div className={classes.root}>
        <input type='text' name='prevent_autofill' id='prevent_autofill' value='' style={{ display: 'none' }}/>
        <input type='password' name='password_fake' id='password_fake' value='' style={{ display: 'none' }}/>
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
                      margin='normal'
                      schema={validationSchema.email}
                    />
                    <TextValidator
                      fullWidth
                      id='password'
                      label='Password'
                      type='password'
                      margin='normal'
                      schema={validationSchema.password}
                    />
                  </Grid>
                </Grid>
              </Grow>
              <Action
                onClickForgotPassword={onClickForgotPassword}
                onCreateAccount={onCreateAccount}
                onClickNext={onClickNext(validation.value as any)}
                canNext={true}
              />
            </Grid>
          </Paper>
        </InCenter>
      </div>
    );
  }
}

export default withStyles(styles)(Login as any);
