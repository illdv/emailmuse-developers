import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import PaperDialog from 'src/renderer/component/Profile/Auth/common/PaperDialog';
import { IValidationState } from 'src/renderer/common/Validation/flux/models';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { checkCodeActions, setAuthStepAction } from 'src/renderer/component/Profile/Auth/flux/module';
import { AuthStep } from 'src/renderer/component/Profile/Auth/flux/models';

export namespace CheckCodeSpace {
  export interface IState {

  }

  export interface IProps {
    profile?: IProfileState;
    validation?: IValidationState;
    onClickBack?: () => void;
    onCheckCode?: (code: string) => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  profile: state.profile,
  validation: state.validation,
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

  onCheckCode = () => {
    // noinspection TsLint
    this.props.onCheckCode(this.props.validation.value['check_code']);
  }

  render() {
    const { profile, onClickBack } = this.props;

    return (
      <PaperDialog
        title={'Check your email and enter code.'}
        subtitle={`A message was sent to ${profile.auth.user.email}.`}
        canNext={true}
        onEnterCompleted={this.onCheckCode}
        onBack={onClickBack}
        id={'check_code'}
        label={'Code'}
        defaultValue={''}
        validation={{}}
      />
    );
  }
}
