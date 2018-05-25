import { take, call, put } from 'redux-saga/effects';

import {
  LOADING,
  REMOVE,
  CREATE,
  failure,
  loaded, set, create, remove, SET, createSuccess,
} from './module';
import { Templates } from 'src/renderer/API/EmailerAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';

export function* loadingTemplates(action) {
  try {
    const response = yield call(Templates.getTemplates);
    yield put(loaded({page: 1, templates: response.data.data}));
  } catch (error) {
    console.log(error);
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
    yield put(set(response.data));
    yield put(FluxToast.Actions.showToast('Save template success.', ToastType.Success));
  } catch (error) {
    console.log(error);
    yield put(FluxToast.Actions.showToast('Save template failed.', ToastType.Error));
  }
}

export function* createTemplate(action) {
  try {
    const response = yield call(Templates.createTemplate, action.payload);
    yield put(createSuccess(response.data));
    yield put(FluxToast.Actions.showToast('Create template success.', ToastType.Success));
  } catch (error) {
    console.log(error);
    yield put(FluxToast.Actions.showToast('Create template failed', ToastType.Error));
  }
}

export function* removeTemplates(action) {
  try {
    const response = yield call(Templates.removeTemplate, action.payload);
    yield put(remove(response.data));
    yield put(FluxToast.Actions.showToast('Remove template success.', ToastType.Success));
  } catch (error) {
    console.log(error);
    yield put(FluxToast.Actions.showToast('Remove template failed', ToastType.Error));
  }
}

export function* watchEdit() {
  while (true) {
    const data = yield take(SET);
    yield call(editTemplate, data);
  }
}

export function* watchCreate() {
  while (true) {
    const data = yield take(CREATE);
    yield call(createTemplate, data);
  }
}

export function* watchRemove() {
  while (true) {
    const data = yield take(REMOVE);
    yield call(removeTemplates, data);
  }
}

export default [watchLoading, watchEdit, watchCreate, watchRemove];
