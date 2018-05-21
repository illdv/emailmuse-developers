import { ChangeEvent, Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { TextField} from '@material-ui/core/';
import PaperDialog, { PaperDialogSpace } from 'src/renderer/component/Auth/common/PaperDialog';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import AuthStep = FluxAccounts.Models.AuthStep;

export namespace ForgotPasswordSpace {
  export interface IState {
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
    dispatch(FluxAccounts.Actions.SetAuthStep(AuthStep.LOGIN));
  },
  onClickNex: () => {
    //
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
class ForgotPassword extends Component<ForgotPasswordSpace.IProps, ForgotPasswordSpace.IState> {

  state = {
    password: '',
    confirmPassword: '',
  };

  stepsRecoveriesPassword = (): { [key: string]: PaperDialogSpace.IProps } => {
    const { onClickBackToLogin} = this.props;
    return {
      askMail: {
        title: 'Pleas enter your email',
        subtitle: 'We will send secret code on your mail',
        label: 'Email',
        onEnterCompleted: (value) => console.log(`Email: ${value}`),
        onBack: onClickBackToLogin,
      },
      askSecretCode: {
        title: 'Pleas enter secret code',
        subtitle: 'Maybe message with secret code got into spam',
        label: 'Secret code',
        onEnterCompleted: (value) => console.log(`Secret: ${value}`),
        onBack: () => console.log(`Email: onBack`),
      },
      askNewPassword: {
        title: 'Pleas enter new password',
        label: 'Password',
        body: this.createPasswordForm(),
        onEnterCompleted: (value) => console.log(`Password: ${value}`),
        onBack: () => console.log(`Email: onBack`),
      }
    };
  }

  createPasswordForm = (): any => {
    return (
      <div>
        <TextField
          fullWidth
          type="password"
          id={'password'}
          label={'Password'}
          margin="normal"
          value={this.state.password}
          onChange={this.onChange}
        />
        <TextField
          fullWidth
          type="password"
          id={'password_confirmation'}
          label={'Confirm password'}
          margin="normal"
          value={this.state.confirmPassword}
          onChange={this.onChange}
        />
      </div>
    );
  }

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.id as any]: event.target.value });
  }

  render() {
    const currentStep = this.stepsRecoveriesPassword().askMail;

    return (
      <PaperDialog {...currentStep}/>
    );
  }
}

export default ForgotPassword;
