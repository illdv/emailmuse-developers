import { ChangeEvent, Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Email } from '@material-ui/icons';
import * as validate from 'validate.js';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import PaperDialog, { PaperDialogSpace } from 'src/renderer/component/Accounts/common/PaperDialog';
import { FluxAccounts } from 'src/renderer/component/Accounts/flux/FluxAccounts';
import { TextValidator } from 'src/renderer/common/TextValidator';
import { useOrDefault } from 'src/renderer/flux/utils';
import AuthStep = FluxAccounts.Models.AuthStep;

enum Step {
  EMAIL,
  SECRET_CODE,
  NEW_PASSWORD,
}

export namespace ForgotPasswordSpace {
  export interface IState {
    secretCode: string;
    mail: string;
    password: string;
    confirmPassword: string;
    step: Step;
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
    secretCode: '',
    mail: '',
    password: '',
    confirmPassword: '',
    step: Step.EMAIL,
  };

  stepsRecoveriesPassword = (): { [key: string]: PaperDialogSpace.IProps } => {
    const { onClickBackToLogin } = this.props;

    const {password, confirmPassword} = this.state;

    const validationSchema = {
      password: {
        length: { minimum: 6 }
      },
      confirmPassword: {
        length: { minimum: 6 },
        equality: {
          attribute: 'password',
          message: 'Those passwords didn\'t match. Try again',
          comparator: (v1, v2) => v1 === v2,
        }
      },
    };

    const validationError = validate({password, confirmPassword}, validationSchema);

    const canNext = validationError === undefined;

    return {
      [Step.EMAIL]: {
        title: 'Pleas enter your email',
        subtitle: 'We will send secret code on your mail',
        label: 'Email',
        defaultValue: this.state.mail,
        onEnterCompleted: (value) => {
          this.setState({
            step: Step.SECRET_CODE,
            mail: value,
          });
        },
        onBack: onClickBackToLogin,
        validation: {email: true},
      },
      [Step.SECRET_CODE]: {
        title: 'Pleas enter secret code',
        subtitle: 'Maybe message with secret code got into spam',
        label: 'Secret code',
        defaultValue: '',
        onEnterCompleted: (value) => {
          this.setState({
            secretCode: value,
            step: Step.NEW_PASSWORD,
          });
        },
        onBack: () => {
          this.setState({
            step: Step.EMAIL,
          });
        },
        validation: {},
      },
      [Step.NEW_PASSWORD]: {
        title: 'Pleas enter new password',
        label: 'Password',
        body: this.createPasswordForm(validationError),
        defaultValue: '',
        canNext,
        onEnterCompleted: (value) => console.log(`Password: ${value}`),
        onBack: () => {
          this.setState({
            step: Step.SECRET_CODE,
          });
        },
        validation: {},
      }
    };
  }

  createPasswordForm = (validationError: any): any => {
    const {password, confirmPassword} = this.state;

    return (
      <div>
        <TextValidator
          fullWidth
          type="password"
          id={'password'}
          label={'Password'}
          margin="normal"
          value={password}
          onChange={this.onChange}
          validationError={useOrDefault(() => (validationError.password[0]), '')}
        />
        <TextValidator
          fullWidth
          type="password"
          id={'passwordConfirmation'}
          label={'Confirm password'}
          margin="normal"
          value={confirmPassword}
          onChange={this.onChange}
          validationError={useOrDefault(() => (validationError.passwordConfirmation[0]), '')}
        />
      </div>
    );
  }

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.id as any]: event.target.value });
  }

  render() {

    const step   = this.state.step;
    const steps = this.stepsRecoveriesPassword();

    const currentStep = steps[step];

    return (
      <PaperDialog {...currentStep}/>
    );
  }
}

export default ForgotPassword;
