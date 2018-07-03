import { createWatch, showModal } from 'src/renderer/flux/saga/utils';
import { select } from 'redux-saga/effects';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { ModalWindowType } from 'src/renderer/common/ModalWindow/flux/actions';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';

function* showModal(type: ModalWindowType) {
  yield put(ModalWindowActions.show.REQUEST({ type }));
}

const selectEmail = createSagaHandler({
  actionCreators: SwipeActions.selectEmail,
  callbackIfSuccess: [
    call(showModal, ModalWindowType.SelectLayout),
  ],
});

export default [
  createWatch(SwipeActions.selectEmail, selectEmail),
];
