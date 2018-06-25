import { call, put } from 'redux-saga/effects';
import { createSagaHandler, createWatch, toastError, toastSuccess } from 'src/renderer/flux/saga/utils';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';
import { LayoutAPI } from 'src/renderer/API/LayoutAPI';
import { extractPagination } from 'src/renderer/common/List/utils';

function* layoutLoading() {
  yield put(LayoutActions.loading.REQUEST({}));
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
  creatorDataForApi: action => action.payload.id,
  apiMethod: LayoutAPI.remove,
  callbackIfSuccess: [
    call(layoutLoading),
    call(toastSuccess, 'Remove layout success'),
  ],
  callbackIfFailure: () => toastError('Remove layout failed'),
});

const sagaCreate = createSagaHandler({
  actionCreators: LayoutActions.create,
  apiMethod: LayoutAPI.create,
  creatorDataForApi: action => action.payload.layout,
  callbackIfSuccess: [
    call(layoutLoading),
    call(toastSuccess, 'Create layout success'),
  ],
  callbackIfFailure: () => toastError('Create layout failed'),
});

const sagaEdit = createSagaHandler({
  actionCreators: LayoutActions.edit,
  apiMethod: LayoutAPI.create,
  creatorDataForApi: action => action.payload.layout,
  callbackIfSuccess: [
    call(layoutLoading),
    call(toastSuccess, 'Layout saved'),
  ],
  callbackIfFailure: () => toastError('Layout saved failed'),
});

const watchLoading = createWatch(LayoutActions.loading, sagaLoading);
const watchRemove  = createWatch(LayoutActions.remove, sagaRemove);
const watchCreate  = createWatch(LayoutActions.create, sagaCreate);
const watchEdit  = createWatch(LayoutActions.edit, sagaEdit);

export default [watchLoading, watchCreate, watchRemove, watchEdit];
