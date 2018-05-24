import { take, call, put, select } from 'redux-saga/effects';

import {
  LOADING,
  EDIT,
  REMOVE,
  CREATE,
  failure,
  loaded,
  updateChanged,
  clearPages
} from './module';
import { Templates } from 'src/renderer/API/EmailerAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';

export function* loadingTemplates(action) {
  try {
    const response = yield call(Templates.getTemplates);
    yield put(loaded(response.data));
  } catch (error) {
    // log
    yield put(failure());
  }
}

export function* watchLoading() {
  while (true) {
    const data = yield take(LOADING);
    yield call(loadingTemplates, data);
  }
}

export function* editTemplate(action) {
  try {
    const response = yield call(Templates.editTemplate, action.payload);
    yield put(updateChanged(response.data));
    yield put(FluxToast.Actions.showToast('Save template success.', ToastType.Success));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Save template failed.', ToastType.Error));
  }
}

export function* createTempate(action) {
  try {
    const response = yield call(Templates.createTemplate, action.payload);
    yield put(clearPages(response.data));
    yield put(FluxToast.Actions.showToast('Create template success.', ToastType.Success));
  } catch (error) {
    console.log(error);
    yield put(FluxToast.Actions.showToast('Create template failed', ToastType.Error));
  }
}

export function* removeTemplates(action) {
  try {
    const response = yield call(Templates.removeTempates, action.payload);
    yield put(clearPages(response.data));
    yield put(FluxToast.Actions.showToast('Remove template success.', ToastType.Success));
  } catch (error) {
    console.log(error);
    yield put(FluxToast.Actions.showToast('Remove template failed', ToastType.Error));
  }
}

export function* watchEdit() {
  while (true) {
    const data = yield take(EDIT);
    yield call(editTemplate, data);
  }
}

export function* watchCreate() {
  while (true) {
    const data = yield take(CREATE);
    yield call(createTempate, data);
  }
}

export function* watchRemove() {
  while (true) {
    const data = yield take(REMOVE);
    yield call(removeTemplates, data);
  }
}

export default [watchLoading, watchEdit, watchCreate, watchRemove];