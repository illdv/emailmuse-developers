import { call, put, select, take } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { CREATE, LOADING, REMOVE, SAVE } from './module';
import { Templates } from 'src/renderer/API/EmailerAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { ITemplatesResponse } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { TemplateAction } from 'src/renderer/component/Templates/flux/module';
import { IGlobalState } from 'src/renderer/flux/rootReducers';

function getCurrentPageSelector(state: IGlobalState) {
  return state.templates.pagination.current_page;
}

function* loadingTemplates(action) {
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
    yield put(TemplateAction.failure());
  }
}

function* saveTemplate(action) {
  try {
    yield call(Templates.editTemplate, action.payload.template);

    if (action.payload.saveAndClose) {
      yield put(TemplateAction.select(null));
    }

    yield put(FluxToast.Actions.showToast('Email saved', ToastType.Success));
    const page: number = yield select(getCurrentPageSelector);
    yield put(TemplateAction.loading({ page, hidePreloader: true }));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Failed email saved', ToastType.Error));
  }
}

function* createTemplate(action) {
  try {
    const axionData = yield call(Templates.createTemplate, action.payload);
    yield put(TemplateAction.createSuccess(axionData.data));

    yield put(FluxToast.Actions.showToast('Email created', ToastType.Success));
    const page = yield select(getCurrentPageSelector);
    yield put(TemplateAction.loading({ page, hidePreloader: true }));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Failed email created', ToastType.Error));
  }
}

function* removeTemplates(action) {
  try {
    yield call(Templates.removeTemplate, action.payload);

    yield put(FluxToast.Actions.showToast('Email removed', ToastType.Success));
    const page: number = yield select(getCurrentPageSelector);
    yield put(TemplateAction.loading({ page }));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Failed email removed', ToastType.Error));
  }
}

function* copyTemplates(action) {
  try {
    yield call(Templates.copyTemplate, action.payload.id);

    yield put(FluxToast.Actions.showToast('Copy template success.', ToastType.Success));
    const page: number = yield select(getCurrentPageSelector);
    yield put(TemplateAction.loading({ page }));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Copy template failed', ToastType.Error));
  }
}

function* watchCopy() {
  while (true) {
    const data = yield take(TemplateAction.copy(null).type);
    yield call(copyTemplates, data);
  }
}

function* watchLoading() {
  while (true) {
    const data = yield take(LOADING);
    yield call(loadingTemplates, data);
  }
}

function* watchSave() {
  while (true) {
    const data = yield take(SAVE);
    yield call(saveTemplate, data);
  }
}

function* watchCreate() {
  while (true) {
    const data = yield take(CREATE);
    yield call(createTemplate, data);
  }
}

function* watchRemove() {
  while (true) {
    const data = yield take(REMOVE);
    yield call(removeTemplates, data);
  }
}

export default [watchLoading, watchSave, watchCreate, watchRemove, watchCopy];
