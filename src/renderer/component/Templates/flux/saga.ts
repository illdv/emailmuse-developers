import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { CREATE, LOADING, REMOVE, SAVE, SELECT_NEW_TEMPLATE } from './module';
import { Templates } from 'src/renderer/API/EmailerAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { ITemplate, ITemplatesResponse } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { TemplateActions } from 'src/renderer/component/Templates/flux/module';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';
import { useOrDefault } from 'src/renderer/utils';
import { selectFromModal } from 'src/renderer/flux/saga/utils';
import { ModalWindowType } from 'src/renderer/common/DialogProvider/flux/actions';
import { Action } from 'redux-act';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { EditorActions } from 'src/renderer/component/Editor/flux/actions';
import { emailToEditEntity } from 'src/renderer/component/Templates/utils';
import { EmailAPI } from 'src/renderer/API/EmailAPI';

function getCurrentPageSelector(state: IGlobalState) {
  return useOrDefault(() => state.templates.pagination.current_page, 0);
}

function* loadingTemplates(action) {
  try {
    const response: AxiosResponse<ITemplatesResponse>
      = yield call(EmailAPI.get, action.payload.page, action.payload.search);

    const { total, current_page, data, last_page, per_page } = response.data;

    yield put(TemplateActions.successfully({
      templates: data,
      pagination: {
        current_page,
        total,
        last_page,
        per_page,
      },
    }));
  } catch (error) {
    yield put(TemplateActions.failure());
  }
}

function* saveTemplate(action) {
  try {
    yield call(EmailAPI.edit, action.payload.template);

    yield put(FluxToast.Actions.showToast('Email saved', ToastType.Success));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Failed email saved', ToastType.Error));
  }
}

function* createTemplate(action: Action<ITemplate>) {
  try {
    const axionData = yield call(EmailAPI.create, [action.payload]);
    yield put(TemplateActions.createSuccess(axionData.data));

    yield put(FluxToast.Actions.showToast('Email created', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(FluxToast.Actions.showToast('Failed email created', ToastType.Error));
  }
}

function* removeTemplates(action) {
  try {
    yield call(EmailAPI.remove, action.payload);

    yield put(FluxToast.Actions.showToast('Email removed', ToastType.Success));
    const page: number = yield select(getCurrentPageSelector);
    yield put(TemplateActions.loading({ page }));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Failed email removed', ToastType.Error));
  }
}

function* copyTemplates(action) {
  try {
    yield call(EmailAPI.copy, action.payload.id);

    yield put(FluxToast.Actions.showToast('Template copy', ToastType.Success));
    const page: number = yield select(getCurrentPageSelector);
    yield put(TemplateActions.loading({ page }));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Failed template copy', ToastType.Error));
  }
}

function* watchCopy() {
  while (true) {
    const data = yield take(TemplateActions.copy(null).type);
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

function* sagaSelectNewTemplate() {
  const actionSelectLayout: Action<{ layout: ILayout }> = yield selectFromModal(ModalWindowType.SelectLayout);

  const selectedLayout = actionSelectLayout.payload.layout;

  yield put(EditorActions.edit.REQUEST(emailToEditEntity({
    id: null,
    title: selectedLayout.title,
    body: selectedLayout.body,
    description: '---',
  })));
}

function* watchSelectNewTemplate() {
  yield takeEvery(SELECT_NEW_TEMPLATE, sagaSelectNewTemplate);
}

export default [watchLoading, watchSave, watchCreate, watchRemove, watchCopy, watchSelectNewTemplate];
