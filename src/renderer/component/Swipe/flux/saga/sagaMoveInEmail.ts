import { all, call, put, race, take, takeEvery, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Action } from 'redux-act';
import { delay } from 'redux-saga';

import { selectFromModal } from 'src/renderer/flux/saga/utils';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { ModalWindowActions, ModalWindowType } from 'src/renderer/common/DialogProvider/flux/actions';
import { IEmail, nodeType } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { EditorActions } from 'src/renderer/component/Editor/flux/actions';
import { emailToEditEntity } from 'src/renderer/component/Emails/utils';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { IEditEntity } from 'src/renderer/component/Editor/flux/interface';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { SwipeUtils } from 'src/renderer/component/Swipe/flux/utils';
import { EmailAPI } from 'src/renderer/API/EmailAPI';
import { folderActions } from 'src/renderer/component/Folder/flux/actions';
import { IGlobalState } from 'src/renderer/flux/rootReducers';

const { temporaryLayoutToEntity } = SwipeUtils;

const insertMarker = 'CONTENTGOESHERE';

function* createTemplates(template: IEmail[]) {
  try {
    yield call(EmailAPI.create, template);
    yield put(push('/emails'));
    yield put(FluxToast.Actions.showToast('Emails created', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(FluxToast.Actions.showToast('Failed emails created', ToastType.Error));
  }
}

/**
 * Use for user to insert Marker in custom Layout.
 */
function* toGiveUserToInsertMarker(selectedLayout: ILayout) {
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
    return save;
  } else {
    yield put(push('/swipe'));
    return null;
  }
}

/**
 * Use for execute step need for create one email from Subjects.
 */
function* sagaMoveSubjectInEmail(action: Action<{ email: IEmail }>) {

  const actionSelectLayout: Action<{ layout: ILayout }> = yield selectFromModal(ModalWindowType.SelectLayout);

  const selectedEmail: IEmail   = action.payload.email;
  const selectedLayout: ILayout = actionSelectLayout.payload.layout;

  if (selectedLayout.body.includes(insertMarker)) {
    yield put(EditorActions.edit.REQUEST(emailToEditEntity({
      ...selectedEmail,
      body: selectedLayout.body.replace(insertMarker, selectedEmail.body),
    })));
  } else {
    const save: Action<IEditEntity> = yield toGiveUserToInsertMarker(selectedLayout);

    if (save) {
      const temporaryLayout: IEditEntity = save.payload;
      yield put(push('/'));
      yield delay(100);
      yield put(EditorActions.edit.REQUEST(emailToEditEntity({
        ...selectedEmail,
        body: temporaryLayout.html.replace(insertMarker, selectedEmail.body),
      })));
    }
  }
}

const getSelectedSwipeTitle = (state: IGlobalState) => state.swipe.selectedSwipe.title;

/**
 * Use for execute step need for create one email from Swipe.
 */
function* sagaMoveSwipeInEmail(action: Action<{ emails: IEmail[] }>) {
  const actionSelectLayout: Action<{ layout: ILayout }> = yield selectFromModal(ModalWindowType.SelectLayout);

  let selectedEmails: IEmail[] = action.payload.emails;
  const selectedLayout: ILayout  = actionSelectLayout.payload.layout;

  const title = yield select(getSelectedSwipeTitle);
  yield put(folderActions.createFolder.REQUEST({
    folder: {
      name: title,
      type: nodeType.folder,
      id: null,
    },
  }));

  const actionFolder: any = yield take(folderActions.createFolder.SUCCESS);

  selectedEmails = selectedEmails.map(email => ({...email,  folder_id: actionFolder.payload.id }));

  if (selectedLayout.body.includes(insertMarker)) {
    const newEmail = selectedEmails.map(email => ({
      ...email,
      body: selectedLayout.body.replace(insertMarker, email.body),
    }));

    yield createTemplates(newEmail);

  } else {
    const save: Action<IEditEntity> = yield toGiveUserToInsertMarker(selectedLayout);

    if (save) {
      const temporaryLayout: IEditEntity = save.payload;
      const newEmail                     = selectedEmails.map(email => ({
        ...email,
        body: temporaryLayout.html.replace(insertMarker, email.body),
      }));

      yield createTemplates(newEmail);
    }
  }
}

function* watcher() {
  yield all([
    takeEvery(SwipeActions.moveSubjectInEmail.REQUEST, sagaMoveSubjectInEmail),
    takeEvery(SwipeActions.moveSwipeInEmail.REQUEST, sagaMoveSwipeInEmail),
  ]);
}

export default [watcher];
