import { ChangeEvent, Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Email } from '@material-ui/icons';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import AuthStep = FluxAccounts.Models.AuthStep;
import { TextValidator } from 'src/renderer/component/Validation/TextValidator';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import { default as PaperDialog, PaperDialogSpace } from 'src/renderer/component/Auth/common/PaperDialog';
import { FluxValidation } from 'src/renderer/component/Validation/flux/actions';

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
    validation?: FluxValidation.IState;
    onClickBackToLogin?: () => void;
    onClickNex?: () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  validation: state.validation
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
    const { onClickBackToLogin, validation } = this.props;

    const {password, confirmPassword} = this.state;

    const validationSchema = {
      email: {
        presence: true,
        email: true
      },
      password: {
        length: { minimum: 6 }
      },
      password_confirmation: {
        length: { minimum: 6 },
        equality: {
          attribute: 'password',
          message: 'Those passwords didn\'t match. Try again',
          comparator: (v1, v2) => v1 === v2,
        }
      },
    };

    return {
      [Step.EMAIL]: {
        title: 'Pleas enter your email',
        subtitle: 'We will send secret code on your mail',
        label: 'Email',
        id: 'email',
        defaultValue: this.state.mail,
        onEnterCompleted: () => {
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

  createPasswordForm = (validationSchema: {password: object, password_confirmation: object}): any => {

    return (
      <div>
        <TextValidator
          fullWidth
          type="password"
          id={'password'}
          label={'Password'}
          margin="normal"
          schema={validationSchema.password}
        />
        <TextValidator
          fullWidth
          type="password"
          id={'password_confirmation'}
          label={'Confirm password'}
          margin="normal"
          schema={validationSchema.password_confirmation}
        />
      </div>
    );
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
