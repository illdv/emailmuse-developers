import { put, race, take } from 'redux-saga/effects';

import { createWatch } from 'src/renderer/flux/saga/utils';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { ModalWindowActions, ModalWindowType } from 'src/renderer/common/ModalWindow/flux/actions';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { EditorActions } from 'src/renderer/component/Editor/flux/actions';
import { emailToEditEntity } from 'src/renderer/component/Templates/utils';
import { Action } from 'redux-act';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';

function* selectFromModal(type: ModalWindowType) {
  yield put(ModalWindowActions.show.REQUEST({ type }));
  const { success, failure } = yield race({
    success: take(ModalWindowActions.show.SUCCESS),
    failure: take(ModalWindowActions.show.FAILURE),
  });

  return success || null;
}

function* sagaMoveSubjectInEmail(action: Action<{ email: ITemplate }>) {

  const actionSelectLayout: Action<{ layout: ILayout }> = yield selectFromModal(ModalWindowType.SelectLayout);

  const selectedEmail: ITemplate = action.payload.email;
  const selectedLayout: ILayout  = actionSelectLayout.payload.layout;

  const layout     = document.createElement('html');
  layout.innerHTML = selectedLayout.body;

  const content: HTMLElement = layout.querySelector('[id=content-email]');
  if (content) {
    while (content.hasChildNodes()) {
      content.removeChild(content.lastChild);
    }
    content.insertAdjacentHTML('afterbegin', selectedEmail.body);

    yield put(EditorActions.edit.REQUEST(emailToEditEntity({ ...selectedEmail, body: layout.innerHTML })));
  } else {
    yield put(EditorActions.edit.REQUEST(emailToEditEntity({
      ...selectedEmail,
      body: `CONTENTGOESHERE ${selectedLayout.body }`,
    })));
    yield put(SwipeActions.needInsertBody.REQUEST({ body: selectedEmail.body }));
  }
}

export default [
  createWatch(SwipeActions.moveSubjectInEmail, sagaMoveSubjectInEmail),
];
