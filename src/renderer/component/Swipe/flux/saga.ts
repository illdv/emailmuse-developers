import { all, call, put, race, take, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Action } from 'redux-act';

import { selectFromModal } from 'src/renderer/flux/saga/utils';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { ModalWindowActions, ModalWindowType } from 'src/renderer/common/ModalWindow/flux/actions';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { EditorActions } from 'src/renderer/component/Editor/flux/actions';
import { emailToEditEntity } from 'src/renderer/component/Templates/utils';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { EntityType, IEditEntity } from 'src/renderer/component/Editor/flux/interface';
import { delay } from 'redux-saga';
import { Templates } from 'src/renderer/API/EmailerAPI';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';

const insertMarker = 'CONTENTGOESHERE';

function insertEmailById(selectedLayout: ILayout, selectedEmail: ITemplate): string {
  const main         = htmlTextToNode(selectedLayout.body);
  const contentEmail = main.querySelector('[id=content-email]');

  while (contentEmail.hasChildNodes()) {
    contentEmail.removeChild(contentEmail.lastChild);
  }
  contentEmail.insertAdjacentHTML('afterbegin', selectedEmail.body);
  return main.innerHTML;
}

function htmlTextToNode(text: string) {
  const layout     = document.createElement('html');
  layout.innerHTML = text;
  return layout;
}

const temporaryLayoutToEntity = ({ id, body, title }: ILayout): IEditEntity => ({
  id,
  html: body,
  idFrontEnd: new Date().getTime().toString(),
  type: EntityType.TemporaryLayout,
  params: {
    title,
  },
});

function isHasIdContentEmail(selectedLayout: ILayout) {
  return htmlTextToNode(selectedLayout.body).querySelector('[id=content-email]');
}

/**
 * Use for create email from Swipe.
 * @param {Action<{email: ITemplate}>} action
 * @returns {IterableIterator<any>}
 */
function* sagaCreateEmailFromLayout(action: Action<{ email: ITemplate }>) {

  const actionSelectLayout: Action<{ layout: ILayout }> = yield selectFromModal(ModalWindowType.SelectLayout);

  const selectedEmail: ITemplate = action.payload.email;
  const selectedLayout: ILayout  = actionSelectLayout.payload.layout;

  if (isHasIdContentEmail(selectedLayout)) {
    const body = insertEmailById(selectedLayout, selectedEmail);
    yield put(EditorActions.edit.REQUEST(emailToEditEntity({ ...selectedEmail, body })));
  } else {
    const entity = temporaryLayoutToEntity({
      ...selectedLayout,
      body: `${insertMarker} ${selectedLayout.body }`,
    });

    yield put(ModalWindowActions.show.REQUEST({ type: ModalWindowType.NeedInsertBody }));
    yield put(EditorActions.edit.REQUEST(entity));

    const { save }: { save: Action<IEditEntity> } = yield race({
      save: take(EditorActions.save.REQUEST),
      close: take(EditorActions.close.REQUEST),
      remove: take(EditorActions.remove.REQUEST),
      saveAndClose: take(EditorActions.saveAndClose.REQUEST),
    });

    if (save) {
      const temporaryLayout: IEditEntity = save.payload;
      yield put(push('/'));
      yield delay(100);
      yield put(EditorActions.edit.REQUEST(emailToEditEntity({
        ...selectedEmail,
        body: temporaryLayout.html.replace(insertMarker, selectedEmail.body),
      })));
    } else {
      yield put(push('/swipe'));
    }
  }
}

function* createTemplates(template: ITemplate[]) {
  try {
    yield call(Templates.createTemplate, template);
    yield put(push('/emails'));
  } catch (error) {
    yield call(errorHandler, error);
  }
}

function* sagaMoveSwipeInEmail(action: Action<{ emails: ITemplate[] }>) {
  const actionSelectLayout: Action<{ layout: ILayout }> = yield selectFromModal(ModalWindowType.SelectLayout);

  const selectedEmails: ITemplate[] = action.payload.emails;
  const selectedLayout: ILayout     = actionSelectLayout.payload.layout;

  if (isHasIdContentEmail(selectedLayout)) {
    const template: ITemplate[] = selectedEmails.map((email): ITemplate => ({
      ...email,
      body: insertEmailById(selectedLayout, email),
    }));

    yield createTemplates(template);

  } else {
    console.log(2);
  }
}

function* watcher() {
  yield all([
    takeEvery(SwipeActions.moveSubjectInEmail.REQUEST, sagaCreateEmailFromLayout),
    takeEvery(SwipeActions.moveSwipeInEmail.REQUEST, sagaMoveSwipeInEmail),
  ]);
}

export default [watcher];
