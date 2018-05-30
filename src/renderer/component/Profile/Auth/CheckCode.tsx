import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import PaperDialog from 'src/renderer/component/Profile/Auth/common/PaperDialog';
import { IValidationState } from 'src/renderer/common/Validation/flux/models';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { checkCodeActions, setAuthStepAction } from 'src/renderer/component/Profile/Auth/flux/module';
import { AuthStep } from 'src/renderer/component/Profile/Auth/flux/models';
import PaperDialog from 'src/renderer/component/Authorization/common/PaperDialog';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import { FormValidation, IFormContext, FormContext } from 'src/renderer/common/Validation/FormValidation';
import AuthStep = FluxAccounts.Models.AuthStep;

export namespace CheckCodeSpace {
  export interface IState {

  }

  export interface IProps {
    profile?: IProfileState;
    onClickBack?: () => void;
    onCheckCode?: (code: string) => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  accounts: state.accounts,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onClickBack: () => {
    dispatch(setAuthStepAction(AuthStep.LOGIN));
  },
  onCheckCode: (code: string) => {
    dispatch(checkCodeActions.REQUEST(code));
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
export class CheckCode extends Component<CheckCodeSpace.IProps, CheckCodeSpace.IState> {

  state = {};

  onCheckCode = (value) => {
    // noinspection TsLint
    this.props.onCheckCode(value['check_code']);
  }

  render() {
    const { profile, onClickBack } = this.props;

    return (
      <FormValidation onValidationSuccessful={this.onCheckCode} schema={{}}>
        <FormContext.Consumer>
          {(context: IFormContext) => (
            <PaperDialog
              title={'Check your email and enter code.'}
              subtitle={`A message was sent to ${profile.auth.user.email}.`}
              canNext={true}
              onEnterCompleted={context.onSubmit}
              onBack={onClickBack}
              id={'check_code'}
              label={'Code'}
              defaultValue={''}
            />
          )}
        </FormContext.Consumer>
      </FormValidation>
    );
  }
}
