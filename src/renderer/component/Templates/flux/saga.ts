import { call, put, select, take } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { CREATE, LOADING, REMOVE, SET } from './module';
import { Templates } from 'src/renderer/API/EmailerAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { ITemplatesResponse } from 'src/renderer/component/Templates/flux/entity';
import { TemplateAction } from 'src/renderer/component/Templates/flux/module';
import { IGlobalState } from 'src/renderer/flux/rootReducers';

function getCurrentPageSelector(state: IGlobalState) {
  return state.templates.pagination.current_page;
}

export function* loadingTemplates(action) {
  try {
    const response: AxiosResponse<ITemplatesResponse> = yield call(Templates.getTemplates, action.payload.page);

    const { total, current_page, data, last_page, per_page } = response.data;

    yield put(TemplateAction.successfully({
      templates: data,
      pagination: {
        current_page,
        total,
        last_page,
        per_page,
      },
    }));
  } catch (error) {
    console.log(error);
    yield put(TemplateAction.failure());
  }
}

export function* editTemplate(action) {
  try {
    yield call(Templates.editTemplate, action.payload);

    yield put(FluxToast.Actions.showToast('Save template success.', ToastType.Success));
    yield put(TemplateAction.loading(yield select(getCurrentPageSelector)));
  } catch (error) {
    console.log(error);
    yield put(FluxToast.Actions.showToast('Save template failed.', ToastType.Error));
  }
}

export function* createTemplate(action) {
  try {
    yield call(Templates.createTemplate, action.payload);

    yield put(FluxToast.Actions.showToast('Create template success.', ToastType.Success));
    yield put(TemplateAction.loading(yield select(getCurrentPageSelector)));
  } catch (error) {
    console.log(error);
    yield put(FluxToast.Actions.showToast('Create template failed', ToastType.Error));
  }
}

export function* removeTemplates(action) {
  try {
    yield call(Templates.removeTemplate, action.payload);

    yield put(FluxToast.Actions.showToast('Remove template success.', ToastType.Success));
    yield put(TemplateAction.loading(yield select(getCurrentPageSelector)));
  } catch (error) {
    console.log(error);
    yield put(FluxToast.Actions.showToast('Remove template failed', ToastType.Error));
  }
}

export function* watchLoading() {
  while (true) {
    const data = yield take(LOADING);
    yield call(loadingTemplates, data);
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
