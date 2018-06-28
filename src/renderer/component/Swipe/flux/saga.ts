import { createSagaHandler, createWatch, toastError } from 'src/renderer/flux/saga/utils';
import { call, put } from 'redux-saga/effects';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { ModalWindowActions, ModalWindowType } from 'src/renderer/common/ModalWindow/flux/actions';

function* showModal(type: ModalWindowType) {
  yield put(ModalWindowActions.show.REQUEST({ type }));
}

function* editSwipe(type: ModalWindowType) {
  yield put(ModalWindowActions.show.REQUEST({ type }));
}

const selectEmail = createSagaHandler({
  actionCreators: SwipeActions.selectEmail,
  callbackIfSuccess: [
    call(showModal, ModalWindowType.SelectLayout),
  ],
});

const selectLayout = createSagaHandler({
  actionCreators: SwipeActions.selectLayout,
  callbackIfSuccess: [
    call(editSwipe, ModalWindowType.SelectLayout),
  ],
});

export default [
  createWatch(SwipeActions.selectEmail, selectEmail),
  createWatch(SwipeActions.selectLayout, selectLayout),
];
