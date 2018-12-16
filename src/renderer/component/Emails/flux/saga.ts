import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import {
  IEmail,
  nodeType,
} from 'src/renderer/component/Emails/flux/interfaceAPI';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';
import { selectFromModal } from 'src/renderer/flux/saga/utils';
import { ModalWindowType } from 'src/renderer/common/DialogProvider/flux/actions';
import { Action } from 'redux-act';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { EditorActions } from 'src/renderer/component/Editor/flux/actions';
import { emailToEditEntity } from 'src/renderer/component/Emails/utils';
import { EmailAPI } from 'src/renderer/API/EmailAPI';
import { FolderAPI } from 'src/renderer/API/FolderAPI';
import {
  IFolder,
  IGetFoldersEmailsResponse,
} from 'src/renderer/component/Folder/flux/interface';
import { FolderActions } from 'src/renderer/component/Folder/flux/actions';
import { emailActions } from 'src/renderer/component/Emails/flux/action';
import { runTutorial } from 'src/renderer/component/Tutorial/flux/reducer';
import { MenuItemType } from '../../Menu/flux/interface';

function* loadingFoldersAndEmails(action: Action<{ s: string }>) {
  try {
    const response: AxiosResponse<IGetFoldersEmailsResponse> = yield call(
      FolderAPI.getFoldersAndEmails,
      action.payload.s,
    );
    const {
      emails,
      folders,
    }: { emails: IEmail[]; folders: IFolder[] } = response.data;

    yield put(FolderActions.getFolders.SUCCESS({ folders }));
    yield put(emailActions.successfully.REQUEST({ emails }));
    const { tutorial } = yield select();
    if (
      localStorage.getItem(MenuItemType.EMAILS) &&
      tutorial.name === MenuItemType.EMAILS
    ) {
      yield put(runTutorial({}));
    }
  } catch (error) {
    yield put(emailActions.failure.REQUEST({}));
  }
}

function* getEmailsFromFolders(action: Action<{ parentId: number }>) {
  const parentId = action.payload.parentId;
  try {
    const response: AxiosResponse<any> = yield call(
      FolderAPI.getEmailsInFolder,
      parentId,
    );
    const emails: IEmail[] = response.data;

    yield put(emailActions.getEmailFromFolder.SUCCESS({ emails }));
  } catch (error) {
    yield put(emailActions.getEmailFromFolder.FAILURE({}));
  }
}

function* saveTemplate(action: Action<{ email: IEmail }>) {
  try {
    yield call(EmailAPI.edit, action.payload.email);
    yield put(emailActions.loading.REQUEST({}));

    yield put(FluxToast.Actions.showToast('Email saved', ToastType.Success));
  } catch (error) {
    yield put(
      FluxToast.Actions.showToast('Failed email saved', ToastType.Error),
    );
  }
}

function* createTemplate(action: Action<{ email: IEmail }>) {
  try {
    const response = yield call(EmailAPI.create, [action.payload.email]);

    yield put(emailActions.createSuccess.REQUEST({ emails: response.data }));
    yield put(FluxToast.Actions.showToast('Email created', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(
      FluxToast.Actions.showToast('Failed email created', ToastType.Error),
    );
  }
}

function* removeTemplates(action) {
  try {
    yield call(EmailAPI.remove, action.payload);
    yield put(FluxToast.Actions.showToast('Email removed', ToastType.Success));
    yield put(FolderActions.openFolder.REQUEST({}));
  } catch (error) {
    yield put(
      FluxToast.Actions.showToast('Failed email removed', ToastType.Error),
    );
  }
}

function* copyTemplates(action) {
  try {
    yield call(EmailAPI.copy, action.payload.id);

    yield put(FluxToast.Actions.showToast('Template copy', ToastType.Success));
    call(loadingFoldersAndEmails, { type: '', payload: { s: '' } });
  } catch (error) {
    yield put(
      FluxToast.Actions.showToast('Failed template copy', ToastType.Error),
    );
  }
}

function* sagaSelectNewTemplate(action) {
  const actionSelectLayout: Action<{ layout: ILayout }> = yield selectFromModal(
    ModalWindowType.SelectLayout,
  );

  const selectedLayout = actionSelectLayout.payload.layout;
  yield put(
    EditorActions.edit.REQUEST(
      emailToEditEntity({
        id: null,
        title: selectedLayout.title,
        body: selectedLayout.body,
        description: '',
        preheader: '',
        folder_id: action.payload.parentId,
        type: nodeType.email,
      }),
    ),
  );
}

function* watcher() {
  yield all([
    takeEvery(emailActions.save.REQUEST, saveTemplate),
    takeEvery(emailActions.create.REQUEST, createTemplate),
    takeEvery(emailActions.remove.REQUEST, removeTemplates),
    takeEvery(emailActions.loading.REQUEST, loadingFoldersAndEmails),
    takeEvery(emailActions.selectNewTemplate.REQUEST, sagaSelectNewTemplate),
    takeEvery(emailActions.copy.REQUEST, copyTemplates),
    takeEvery(emailActions.getEmailFromFolder.REQUEST, getEmailsFromFolders),
  ]);
}

export default [watcher];
