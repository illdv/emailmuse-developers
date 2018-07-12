import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { Confirmation } from 'src/renderer/common/DialogProvider/Confirmation';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { IModalWindowActions, ModalWindowActions } from 'src/renderer/common/DialogProvider/flux/actions';

export namespace CloseEditorSpace {
  export interface IState {

  }

  export interface IProps {
    modalWindowActions: IModalWindowActions;
  }
}

class CloseEditor extends Component<CloseEditorSpace.IProps, CloseEditorSpace.IState> {

  state: CloseEditorSpace.IState = {};

  onClose = () => {
    this.props.modalWindowActions.show.FAILURE({});
  }

  onSelectYes = () => {
    this.props.modalWindowActions.show.SUCCESS({});
  }

  render() {

    return (
      <Confirmation
        title='Are you sure?'
        isOpen={true}
        onClose={this.onClose}
        onSelectYes={this.onSelectYes}
        question={'Your changes are not saved. Do you want to leave this page?'}
      />
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  /// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  modalWindowActions: bindModuleAction(ModalWindowActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CloseEditor);
