import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import PaperDialog from 'src/renderer/component/Authorization/common/PaperDialog';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import { FluxValidation } from 'src/renderer/component/Validation/flux/actions';
import AuthStep = FluxAccounts.Models.AuthStep;

export namespace CheckCodeSpace {
  export interface IState {

  }

  export interface IProps {
    accounts?: FluxAccounts.IState;
    validation?: FluxValidation.IState;
    onClickBack?: () => void;
    onCheckCode?: (code: string) => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  accounts: state.accounts,
  validation: state.validation,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onClickBack: () => {
    dispatch(FluxAccounts.Actions.SetAuthStep(AuthStep.LOGIN));
  },
  onCheckCode: (code: string) => {
    dispatch(FluxAccounts.Actions.CreateAccount.checkCode.REQUEST(code));
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
    const { accounts, onClickBack } = this.props;

    return (
      <PaperDialog
        title={'Check your email and enter code.'}
        subtitle={`A message was sent to ${accounts.user.email}.`}
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
