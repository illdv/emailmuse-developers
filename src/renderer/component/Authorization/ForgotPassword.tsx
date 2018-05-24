import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Email } from '@material-ui/icons';
import { bindActionCreators } from 'redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { TextValidator } from 'src/renderer/common/Validation/TextValidator';
import { default as PaperDialog, PaperDialogSpace } from 'src/renderer/component/Authorization/common/PaperDialog';
import { FluxValidation } from 'src/renderer/common/Validation/flux/actions';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import AuthStep = FluxAccounts.Models.AuthStep;

enum Step {
  EMAIL,
  SECRET_CODE,
  NEW_PASSWORD,
}

export namespace ForgotPasswordSpace {
  export interface IState {
    step: Step;
  }

  export interface IProps {
    classes?: any;
    actions?: FluxValidation.Actions.IAllAction;
    validation?: FluxValidation.IState;
    onSendCode?: (mail: string) => void;
    resetPassword?: (email: string, token: string, password: string, passwordConfirmation: string) => void;
    onClickBackToLogin?: () => void;
    onClickNex?: () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  validation: state.validation,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onClickBackToLogin: () => {
    dispatch(FluxAccounts.Actions.SetAuthStep(AuthStep.LOGIN));
  },
  onSendCode: (mail: string) => {
    dispatch(FluxAccounts.Actions.ForgotPassword.sendCodeOnMail.REQUEST(mail));
  },
  resetPassword: (email: string, token: string, password: string, passwordConfirmation: string) => {
    dispatch(FluxAccounts.Actions.ForgotPassword.resetPassword.REQUEST(email, token, password, passwordConfirmation));
  },
  actions: bindActionCreators({
    ...FluxValidation.Actions.AllAction,
  }, dispatch),
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
    const { onClickBackToLogin, validation } = this.props;

    const validationSchema = {
      email: {
        presence: true,
        email: true,
      },
      password: {
        length: { minimum: 6 },
      },
      secret_code: {
        presence: true,
      },
      password_confirmation: {
        length: { minimum: 6 },
        equality: {
          attribute: 'password',
          message: 'Those passwords didn\'t match. Try again',
          comparator: (v1, v2) => v1 === v2,
        },
      },
    };

    return {
      [Step.EMAIL]: {
        title: 'Pleas enter your email',
        subtitle: 'We will send secret code on your mail',
        label: 'Email',
        id: 'email',
        defaultValue: this.state.mail,
        canNext: validation.isValid,
        onEnterCompleted: () => {
          this.props.onSendCode((validation.value as any).email);
          this.setState({
            step: Step.SECRET_CODE,
          });
        },
        onBack: onClickBackToLogin,
        validation: validationSchema.email,
      },
      [Step.SECRET_CODE]: {
        title: 'Pleas enter secret code',
        subtitle: 'Maybe message with secret code got into spam',
        label: 'Secret code',
        defaultValue: '',
        id: 'secret_code',
        canNext: validation.isValid,
        body: this.createSecretCodeForm(validationSchema),
        onEnterCompleted: () => {
          this.setState({
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
        body: this.createPasswordForm(validationSchema),
        defaultValue: '',
        id: 'passwords',
        canNext: validation.isValid,
        onEnterCompleted: () => {
          this.props.resetPassword(
            (validation.value as any).email,
            (validation.value as any).secret_code,
            (validation.value as any).password,
            (validation.value as any).password_confirmation,
          );
        },
        onBack: () => {
          this.setState({
            step: Step.SECRET_CODE,
          });
        },
        validation: {},
      },
    };
  }

  createPasswordForm = (validationSchema: { password: object, password_confirmation: object }): any => {

    return (
      <div>
        <TextValidator
          fullWidth
          type='password'
          id={'password'}
          label={'Password'}
          margin='normal'
          schema={validationSchema.password}
        />
        <TextValidator
          fullWidth
          type='password'
          id={'password_confirmation'}
          label={'Confirm password'}
          margin='normal'
          schema={validationSchema.password_confirmation}
        />
      </div>
    );
  }

  createSecretCodeForm = (validationSchema: { secret_code: object }): any => {
    return (
      <TextValidator
        fullWidth
        id={'secret_code'}
        label={'Secret code'}
        margin='normal'
        schema={validationSchema.secret_code}
      />
    );
  }

  render() {

    const step  = this.state.step;
    const steps = this.stepsRecoveriesPassword();

    const currentStep = steps[step];

    return (
      <PaperDialog {...currentStep}/>
    );
  }
}

export default ForgotPassword;
