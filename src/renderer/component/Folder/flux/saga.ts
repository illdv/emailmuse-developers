import { all, call, put, race, take, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Action } from 'redux-act';

import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';
import { FolderActions } from './actions';
import { FolderAPI } from 'src/renderer/API/FolderAPI';
import { selectFromModal } from 'src/renderer/flux/saga/utils';
import { ModalWindowType } from 'src/renderer/common/DialogProvider/flux/actions';
import { IFolder } from 'src/renderer/component/Folder/flux/interface';
import { nodeType } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { emailActions } from 'src/renderer/component/Emails/flux/action';

function* showFolderModal(action: Action<{ parentId: number }>) {
  const newFolderName: Action<{ folderName: string }> = yield selectFromModal(
    ModalWindowType.CreateFolder,
  );
  const folder: IFolder = {
    id: null,
    name: newFolderName.payload.folderName,
    parentId: action.payload.parentId,
    type: nodeType.folder,
  };
  yield put(FolderActions.createFolder.REQUEST({ folder }));
}

function* createFolder(action: Action<{ folder: IFolder }>) {
  const folder: IFolder = action.payload.folder;
  if (folder.name) {
    try {
      const response = yield call(FolderAPI.createFolder, folder);
      yield put(FolderActions.createFolder.SUCCESS(response.data));

      yield put(emailActions.loading.REQUEST({}));
      yield put(
        FluxToast.Actions.showToast('Folder created', ToastType.Success),
      );
    } catch (error) {
      yield call(errorHandler, error);
      yield put(
        FluxToast.Actions.showToast('Failed folder created', ToastType.Error),
      );
    }
  }
}

function* updateFolder(action: Action<{ folder: IFolder }>) {
  const folder: IFolder = action.payload.folder;
  const folderId: number = action.payload.folder.id;
  try {
    yield call(FolderAPI.updateFolder, folderId, folder);
    yield put(FluxToast.Actions.showToast('Folder updated', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(
      FluxToast.Actions.showToast('Failed folder updated', ToastType.Error),
    );
  }
}

function* deleteFolder(action: Action<{ ids: number[] }>) {
  const folderIds: number[] = action.payload.ids;
  try {
    yield call(FolderAPI.deleteFolders, folderIds);
    yield put(FolderActions.deleteFolder.SUCCESS({ ids: folderIds }));
    if (folderIds.length > 1) {
      yield put(
        FluxToast.Actions.showToast('Folders deleted', ToastType.Success),
      );
    } else {
      yield put(
        FluxToast.Actions.showToast('Folder deleted', ToastType.Success),
      );
    }
  } catch (error) {
    yield call(errorHandler, error);
    yield put(
      FluxToast.Actions.showToast('Failed folder deleted', ToastType.Error),
    );
  }
}

function* openFolder(action: Action<{ folder?: IFolder }>) {
  const { folder } = action.payload;
  if (folder) {
    yield put(emailActions.getEmailFromFolder.REQUEST({ parentId: folder.id }));

    const { success } = yield race({
      success: take(emailActions.getEmailFromFolder.SUCCESS),
      failure: take(emailActions.getEmailFromFolder.FAILURE),
    });

    if (success) {
      yield put(push(`/emails/${folder.id}/${folder.name}`));
    }
  } else {
    yield put(push(`/emails`));
    yield put(emailActions.loading.REQUEST({}));
  }
}

function* watcher() {
  yield all([
    takeEvery(FolderActions.showModal.REQUEST, showFolderModal),
    takeEvery(FolderActions.createFolder.REQUEST, createFolder),
    takeEvery(FolderActions.updateFolder.REQUEST, updateFolder),
    takeEvery(FolderActions.deleteFolder.REQUEST, deleteFolder),
    takeEvery(FolderActions.openFolder.REQUEST, openFolder),
  ]);
}

export default [watcher];
