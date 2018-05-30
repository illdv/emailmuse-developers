import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Email } from '@material-ui/icons';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { default as PaperDialog, PaperDialogSpace } from 'src/renderer/component/Authorization/common/PaperDialog';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import { TextValidator } from 'src/renderer/common/Validation/TextValidator';
import { FormContext, FormValidation, IFormContext } from 'src/renderer/common/Validation/FormValidation';
import AuthStep = FluxAccounts.Models.AuthStep;

enum Step {
  EMAIL,
  SECRET_CODE,
  NEW_PASSWORD,
}

const validationSchemaMail = {
  email: {
    presence: true,
    email: true,
  },
};

const validationSchemaPassword = {
  password: {
    length: { minimum: 6 },
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

const validationSchemaSecretCode = {
  secret_code: {
    presence: true,
  },
};

export namespace ForgotPasswordSpace {
  export interface IState {
    step: Step;
    secretCode: string;
    mail: string;
  }

  export interface IProps {
    classes?: any;
    onSendCode?: (mail: string) => void;
    resetPassword?: (email: string, token: string, password: string, passwordConfirmation: string) => void;
    onClickBackToLogin?: () => void;
    onClickNex?: () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({});

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
});

@(connect(mapStateToProps, mapDispatchToProps))
class ForgotPassword extends Component<ForgotPasswordSpace.IProps, ForgotPasswordSpace.IState> {

  state: ForgotPasswordSpace.IState = {
    secretCode: '',
    mail: '',
    step: Step.EMAIL,
  };

  stepsRecoveriesPassword = (): { [key: string]: PaperDialogSpace.IProps } => {
    const { onClickBackToLogin } = this.props;

    return {
      [Step.EMAIL]: {
        title: 'Pleas enter your email',
        subtitle: 'We will send secret code on your mail',
        label: 'Email',
        id: 'email',
        defaultValue: this.state.mail,
        canNext: true,
        onBack: onClickBackToLogin,
      },
      [Step.SECRET_CODE]: {
        title: 'Pleas enter secret code',
        subtitle: 'Maybe message with secret code got into spam',
        label: 'Secret code',
        defaultValue: '',
        id: 'secret_code',
        canNext: true,
        body: this.createSecretCodeForm(),
        onBack: () => {
          this.setState({
            step: Step.EMAIL,
          });
        },
      },
      [Step.NEW_PASSWORD]: {
        title: 'Pleas enter new password',
        label: 'Password',
        body: this.createPasswordForm(),
        defaultValue: '',
        id: 'passwords',
        canNext: true,
        onBack: () => {
          this.setState({
            step: Step.SECRET_CODE,
          });
        },
      },
    };
  }

  createPasswordForm = (): any => {
    return (
      <div>
        <TextValidator
          fullWidth
          type='password'
          id={'password'}
          label={'Password'}
          margin='normal'
        />
        <TextValidator
          fullWidth
          type='password'
          id={'password_confirmation'}
          label={'Confirm password'}
          margin='normal'
        />
      </div>
    );
  }

  createSecretCodeForm = (): any => {
    return (
      <TextValidator
        fullWidth
        id={'secret_code'}
        label={'Secret code'}
        margin='normal'
      />
    );
  }

  onEnterMail = (value) => {
    const mail = value.email;
    this.props.onSendCode(mail);
    this.setState({
      step: Step.SECRET_CODE,
      mail,
    });
  }

  onEnterCode = (value) => {
    this.setState({
      step: Step.NEW_PASSWORD,
      secretCode: value.secret_code,
    });
  }

  onEnterNewPassword = (value) => {
    const { mail, secretCode } = this.state;
    this.props.resetPassword(
      mail,
      secretCode,
      value.password,
      value.password_confirmation,
    );
  }

  render() {

    const currentStep = this.state.step;
    const steps       = this.stepsRecoveriesPassword();

    if (currentStep === Step.NEW_PASSWORD) {
      return (
        <FormValidation
          onValidationSuccessful={this.onEnterNewPassword}
          schema={validationSchemaPassword}
        >
          <FormContext.Consumer>
            {(context: IFormContext) => (
              <PaperDialog {...steps[Step.NEW_PASSWORD]} onEnterCompleted={context.onSubmit}/>
            )}
          </FormContext.Consumer>
        </FormValidation>
      );
    }

    if (currentStep === Step.SECRET_CODE) {
      return (
        <FormValidation
          onValidationSuccessful={this.onEnterCode}
          schema={validationSchemaSecretCode}
        >
          <FormContext.Consumer>
            {(context: IFormContext) => (
              <PaperDialog {...steps[Step.SECRET_CODE]} onEnterCompleted={context.onSubmit}/>
            )}
          </FormContext.Consumer>
        </FormValidation>
      );
    }

    return (
      <FormValidation
        onValidationSuccessful={this.onEnterMail}
        schema={validationSchemaMail}
      >
        <FormContext.Consumer>
          {(context: IFormContext) => (
            <PaperDialog {...steps[Step.EMAIL]} onEnterCompleted={context.onSubmit}/>
          )}
        </FormContext.Consumer>
      </FormValidation>
    );
  }
}

export default ForgotPassword;
