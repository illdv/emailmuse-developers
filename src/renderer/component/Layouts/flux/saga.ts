import { call, put } from 'redux-saga/effects';
import { createSagaHandler, createWatch} from 'src/renderer/flux/saga/utils';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';
import { LayoutAPI } from 'src/renderer/API/LayoutAPI';
import { extractPagination } from 'src/renderer/common/List/utils';
import { toastError, toastSuccess } from 'src/renderer/flux/saga/toast';

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
  creatorDataForApi: action => action.payload,
  apiMethod: LayoutAPI.remove,
  callbackIfSuccess: [
    call(layoutLoading),
    call(toastSuccess, 'Auth removed'),
  ],
  callbackIfFailure: () => toastError('Failed layout removed'),
});

const sagaCreate = createSagaHandler({
  actionCreators: LayoutActions.create,
  apiMethod: LayoutAPI.create,
  creatorDataForApi: action => action.payload.layout,
  callbackIfSuccess: [
    call(layoutLoading),
    call(toastSuccess, 'Auth created'),
  ],
  callbackIfFailure: () => toastError('Failed layout created'),
});

const sagaEdit = createSagaHandler({
  actionCreators: LayoutActions.edit,
  apiMethod: LayoutAPI.edit,
  creatorDataForApi: action => action.payload.layout,
  callbackIfSuccess: [
    call(layoutLoading),
    call(toastSuccess, 'Auth saved'),
  ],
  callbackIfFailure: () => toastError('Failed layout saved'),
});

const watchLoading = createWatch(LayoutActions.loading, sagaLoading);
const watchRemove  = createWatch(LayoutActions.remove, sagaRemove);
const watchCreate  = createWatch(LayoutActions.create, sagaCreate);
const watchEdit  = createWatch(LayoutActions.edit, sagaEdit);

export default [watchLoading, watchCreate, watchRemove, watchEdit];
