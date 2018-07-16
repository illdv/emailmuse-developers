import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { IModalWindowState } from 'src/renderer/common/DialogProvider/flux/reducer';
import SelectLayout from 'src/renderer/common/DialogProvider/Dialogs/SelectLayout';
import { NeedInsertBody } from 'src/renderer/common/DialogProvider/Dialogs/NeedInsertBody';
import CloseEditor from 'src/renderer/common/DialogProvider/Dialogs/CloseEditor';
import {
  IModalWindowActions,
  ModalWindowActions,
  ModalWindowType,
} from 'src/renderer/common/DialogProvider/flux/actions';

export namespace ModalProviderSpace {
  export interface IState {
  }

  export interface IProps {
    modalWindow: IModalWindowState;
    modalWindowActions: IModalWindowActions;
  }
}

const modalWindowMap: {[key in ModalWindowType]: any} = {
  [ModalWindowType.SelectLayout]: <SelectLayout/>,
  [ModalWindowType.NeedInsertBody]: <NeedInsertBody/>,
  [ModalWindowType.ConfirmationCloseEditor]: <CloseEditor/>,
};

class ModalProvider extends Component<ModalProviderSpace.IProps, ModalProviderSpace.IState> {

  state: ModalProviderSpace.IState = {};

  render() {
    const { type } = this.props.modalWindow;
    if (!type) {
      return <></>;
    }
    return modalWindowMap[type];
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  modalWindow: state.modalWindow,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  modalWindowActions: bindModuleAction(ModalWindowActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalProvider);
