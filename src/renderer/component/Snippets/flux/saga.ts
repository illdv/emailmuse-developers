import { AxiosResponse } from 'axios';

import { call, put, select, take } from 'redux-saga/effects';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { SnippetsAPI } from 'src/renderer/API/SnippetsAPI';
import { ILoadingResponse } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { SnippetsAction } from 'src/renderer/component/Snippets/flux/actions';

function getCurrentPageSelector(state: IGlobalState) {
  return state.snippets.pagination.current_page;
}

function* loadingSnippetsSaga(action) {
  try {
    const { page, shortcut }                        = action.payload;
    const response: AxiosResponse<ILoadingResponse> = yield call(SnippetsAPI.loadingSnippets, page, shortcut);

    const { data, last_page, per_page, current_page, total } = response.data;
    yield put(SnippetsAction.loading.SUCCESS(
      {
        snippets: data,
        pagination: {
          last_page,
          per_page,
          current_page,
          total,
        },
      },
    ));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Failed snippets loading', ToastType.Error));
  }
}

function* watchLoadingSnippets() {
  while (true) {
    const action = yield take(SnippetsAction.loading.REQUEST(null).type);
    yield call(loadingSnippetsSaga, action);
  }
}

function* removeSnippetsSaga(action) {
  try {
    yield call(SnippetsAPI.deleteSnippets, [action.payload.id]);
    yield put(FluxToast.Actions.showToast('Snippet deleted', ToastType.Success));
    yield put(SnippetsAction.remove.SUCCESS({}));

    const currentPage = yield select(getCurrentPageSelector);
    yield put(SnippetsAction.loading.REQUEST({ page: currentPage }));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Failed snippet deleted', ToastType.Error));
  }
}

function* watchRemoveSnippets() {
  while (true) {
    const action = yield take(SnippetsAction.remove.REQUEST(null).type);
    yield call(removeSnippetsSaga, action);
  }
}

function* addSnippetsSaga(action) {
  try {
    const axionData = yield call(SnippetsAPI.addSnippets, action.payload.snippet);
    yield put(SnippetsAction.add.SUCCESS({ snippet: axionData.data }));
    const currentPage = yield select(getCurrentPageSelector);

    yield put(FluxToast.Actions.showToast('Snippet created', ToastType.Success));
    yield put(SnippetsAction.loading.REQUEST({ page: currentPage }));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Failed snippet created', ToastType.Error));
  }
}

function* watchAddSnippets() {
  while (true) {
    const action = yield take(SnippetsAction.add.REQUEST(null).type);
    yield call(addSnippetsSaga, action);
  }
}

function* editSnippetsSaga(action) {
  try {
    yield call(SnippetsAPI.editSnippets, action.payload.snippet);
    yield put(FluxToast.Actions.showToast('Snippet saved', ToastType.Success));
    const currentPage = yield select(getCurrentPageSelector);
    yield put(SnippetsAction.loading.REQUEST({ page: currentPage }));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Failed snippet saved', ToastType.Error));
  }
}

function* watchEditSnippets() {
  while (true) {
    const action = yield take(SnippetsAction.edit.REQUEST(null).type);
    yield call(editSnippetsSaga, action);
  }
}

function* saveAndCloseSaga(action) {
  yield put(SnippetsAction.edit.REQUEST({ snippet: action.payload.snippet }));
  yield put(SnippetsAction.selectSnippet({ selectSnippet: null }));
}

function* watchCloseAndSave() {
  while (true) {
    const action = yield take(SnippetsAction.saveAndClose(null).type);
    yield call(saveAndCloseSaga, action);
  }
}

export default [
  watchLoadingSnippets,
  watchRemoveSnippets,
  watchAddSnippets,
  watchEditSnippets,
  watchCloseAndSave,
];
