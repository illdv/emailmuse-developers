import { all, put, race, take, takeEvery } from 'redux-saga/effects';
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

const insertMarker = 'CONTENTGOESHERE';

function insertEmailById(content: HTMLElement, selectedEmail: ITemplate) {
  while (content.hasChildNodes()) {
    content.removeChild(content.lastChild);
  }
  content.insertAdjacentHTML('afterbegin', selectedEmail.body);
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

function* sagaCreateEmailFromLayout(action: Action<{ email: ITemplate }>) {

  const actionSelectLayout: Action<{ layout: ILayout }> = yield selectFromModal(ModalWindowType.SelectLayout);

  const selectedEmail: ITemplate = action.payload.email;
  const selectedLayout: ILayout  = actionSelectLayout.payload.layout;

  const layout = htmlTextToNode(selectedLayout.body);

  const content: HTMLElement = layout.querySelector('[id=content-email]');

  if (content) {
    insertEmailById(content, selectedEmail);
    yield put(EditorActions.edit.REQUEST(emailToEditEntity({ ...selectedEmail, body: layout.innerHTML })));
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

function* watcherCreateEmailFromLayout() {
  yield all([
    takeEvery(SwipeActions.moveSubjectInEmail.REQUEST, sagaCreateEmailFromLayout),
  ]);
}

export default [watcherCreateEmailFromLayout];
