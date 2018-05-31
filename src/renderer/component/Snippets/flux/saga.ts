import { call, put, take } from 'redux-saga/effects';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { LOADING_SNIPPETS, SnippetsAction } from 'src/renderer/component/Snippets/flux/module';
import { SnippetsAPI } from 'src/renderer/API/Snippets';
import { AxiosResponse } from 'axios';
import { ILoadingResponse } from 'src/renderer/component/Snippets/flux/interfaceAPI';

export function* loadingSnippetsSaga(action) {
  try {
    const response: AxiosResponse<ILoadingResponse> = yield call(SnippetsAPI.loadingSnippets);
    const {data, last_page, per_page, current_page, total} = response.data;
    yield put(SnippetsAction.successfully(
      {
        snippet: data,
        pagination: {
          last_page,
          per_page,
          current_page,
          total,
        },
      },
    ));
  } catch (error) {
    console.log(error);
    yield put(FluxToast.Actions.showToast('Loading snippets failed', ToastType.Error));
  }
}

export function* watchLoadingSnippets() {
  while (true) {
    const action = yield take(LOADING_SNIPPETS);
    yield call(loadingSnippetsSaga, action);
  }
}
