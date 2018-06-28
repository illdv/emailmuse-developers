import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { bindModuleAction } from 'src/renderer/utils';
import { IModalWindowActions, ModalWindowActions, ModalWindowType } from 'src/renderer/common/ModalWindow/flux/actions';
import { IModalWindowState } from 'src/renderer/common/ModalWindow/flux/reducer';
import { DialogInsertLinkButton } from 'src/renderer/common/Jodit/dialogs/insertLinkButton/DialogInsertLinkButton';

export namespace ModalProviderSpace {
  export interface IState {
  }

  export interface IProps {
    modalWindow: IModalWindowState;
    modalWindowActions: IModalWindowActions;
  }
}

const modalWindowMap: {[key in ModalWindowType]: any} = {
  [ModalWindowType.Type1]: <DialogInsertLinkButton isOpen={true} handleClose={null} insertHTML={null}/>,
  [ModalWindowType.Type2]: <h1>Modal 2</h1>,
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
