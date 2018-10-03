import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import PaperDialog from 'src/renderer/component/Profile/Authorisation/common/PaperDialog';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { FormContext, FormValidation, IFormContext } from 'src/renderer/common/Validation/FormValidation';
import { AuthorisationActions, IAuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { AuthStep } from 'src/renderer/component/Profile/Authorisation/flux/models';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { HotKey } from 'src/renderer/common/HotKey/HotKey';

export namespace CheckCodeSpace {
  export interface IState {

  }

  export interface IProps {
    profile?: IProfileState;
    action?: IAuthorisationActions;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  action: bindModuleAction(AuthorisationActions, dispatch),
});

@(connect(mapStateToProps, mapDispatchToProps))
export class CheckCode extends Component<CheckCodeSpace.IProps, CheckCodeSpace.IState> {

  state = {};

  onCheckCode = value => {
    // noinspection TsLint
    this.props.action.checkCode.REQUEST({ code: value['check_code'],
        email:this.props.profile.auth.user.email,
        password:this.props.profile.auth.password
    });
  }

  onClickBack = () => {
    this.props.action.setAuthStep.REQUEST({ authStep: AuthStep.LOGIN });
  }

  onSendNewCode = email => {
    this.props.action.sendNewCode.REQUEST({ email });
  }

  render() {
    const { profile } = this.props;

    return (
        <FormValidation onValidationSuccessful={this.onCheckCode} schema={{}}>
          <FormContext.Consumer>
            {(context: IFormContext) => (
              <HotKey hotKey={'Enter'} onPress={context.onSubmit}>
                <PaperDialog
                  title={'Check your email and enter code.'}
                  subtitle={`A message was sent to ${profile.auth.user.email}.`}
                  email={profile.auth.user.email}
                  canNext={true}
                  onEnterCompleted={context.onSubmit}
                  onBack={this.onClickBack}
                  onSendNewCode={this.onSendNewCode}
                  id={'check_code'}
                  label={'Code'}
                  defaultValue={''}
                />
              </HotKey>
            )}
          </FormContext.Consumer>
        </FormValidation>
    );
  }
}
