import { all, call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Action } from 'redux-act';

import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';
import { folderActions } from './actions';
import { FolderAPI } from 'src/renderer/API/FolderAPI';

import { selectFromModal } from 'src/renderer/flux/saga/utils';
import { ModalWindowType } from 'src/renderer/common/DialogProvider/flux/actions';

function* showFolderModal(action) {
  const newFolderName: Action<{ folderName: string }> = yield selectFromModal(ModalWindowType.CreateFolder);
  const newFolder: IFolder = {
    name: newFolderName.payload.folderName,
    parentId: action.payload.parentId,
  };
  yield put(folderActions.createFolder.REQUEST({ newFolder }));
}

function* createFolder(action) {
  const newFolder: IFolder = action.payload.newFolder;
  try {
    yield call(FolderAPI.createFolder, newFolder);
    yield put(FluxToast.Actions.showToast('Folder created', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(FluxToast.Actions.showToast('Failed folder created', ToastType.Error));
  }
}

function* watcher() {
  yield all([
    takeEvery(folderActions.showModal.REQUEST, showFolderModal),
    takeEvery(folderActions.createFolder.REQUEST, createFolder),
  ]);
}

export default [watcher];
