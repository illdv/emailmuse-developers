import { call, put, select } from 'redux-saga/effects';
import {
  createSagaHandler,
  createWatch,
  createWatchSuccess,
} from 'src/renderer/flux/saga/utils';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';
import { LayoutAPI } from 'src/renderer/API/LayoutAPI';
import { extractPagination } from 'src/renderer/common/List/utils';
import { toastError, toastSuccess } from 'src/renderer/flux/saga/toast';
import { runTutorial } from 'src/renderer/component/Tutorial/flux/reducer';
import { MenuItemType } from 'src/renderer/component/Menu/flux/interface';

function* layoutLoading() {
  yield put(LayoutActions.loading.REQUEST({}));
  if (localStorage.getItem(MenuItemType.LAYOUTS)) {
    yield put(runTutorial({}));
  }
}

function* sagaLoadingSuccess() {
  const { tutorial } = yield select();
  if (
    localStorage.getItem(MenuItemType.LAYOUTS) &&
    tutorial.name === MenuItemType.LAYOUTS
  ) {
    yield put(runTutorial({}));
  }
}

const sagaLoading = createSagaHandler({
  actionCreators: LayoutActions.loading,
  apiMethod: LayoutAPI.loading,
  responseHandler: response => ({
    layouts: response.data.data,
    pagination: extractPagination(response.data),
  }),
});

const sagaRemove = createSagaHandler({
  actionCreators: LayoutActions.remove,
  creatorDataForApi: action => action.payload,
  apiMethod: LayoutAPI.remove,
  callbackIfSuccess: [
    call(layoutLoading),
    call(toastSuccess, 'Layout removed'),
  ],
  callbackIfFailure: () => toastError('Failed layout removed'),
});

const sagaCreate = createSagaHandler({
  actionCreators: LayoutActions.create,
  apiMethod: LayoutAPI.create,
  creatorDataForApi: action => action.payload.layout,
  callbackIfSuccess: [
    call(layoutLoading),
    call(toastSuccess, 'New layout created'),
  ],
  callbackIfFailure: () => toastError('Failed layout created'),
});

const sagaEdit = createSagaHandler({
  actionCreators: LayoutActions.edit,
  apiMethod: LayoutAPI.edit,
  creatorDataForApi: action => action.payload.layout,
  callbackIfSuccess: [call(layoutLoading), call(toastSuccess, 'Layout saved')],
  callbackIfFailure: () => toastError('Failed layout saved'),
});

const watchLoading = createWatch(LayoutActions.loading, sagaLoading);
const watchLoadingSuccess = createWatchSuccess(
  LayoutActions.loading,
  sagaLoadingSuccess,
);
const watchRemove = createWatch(LayoutActions.remove, sagaRemove);
const watchCreate = createWatch(LayoutActions.create, sagaCreate);
const watchEdit = createWatch(LayoutActions.edit, sagaEdit);

export default [
  watchLoading,
  watchCreate,
  watchRemove,
  watchEdit,
  watchLoadingSuccess,
];
