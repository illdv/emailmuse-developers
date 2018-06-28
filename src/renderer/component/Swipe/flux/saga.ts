import { createSagaHandler, createWatch, toastError, toastSuccess } from 'src/renderer/flux/saga/utils';
import { call, put } from 'redux-saga/effects';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { ModalWindowActions, ModalWindowType } from 'src/renderer/common/ModalWindow/flux/actions';

function* showModal(type: ModalWindowType) {
  yield put(ModalWindowActions.show.REQUEST({ type }));
}

const moveInEmail = createSagaHandler({
  actionCreators: SwipeActions.moveInEmail,
  callbackIfSuccess: [
    call(showModal, ModalWindowType.Type1),
  ],
  callbackIfFailure: () => toastError('Layout saved failed'),
});

const watchMoveInEmail = createWatch(SwipeActions.moveInEmail, moveInEmail);

export default [watchMoveInEmail];
