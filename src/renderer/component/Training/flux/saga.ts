import { push } from 'react-router-redux';
import { all, takeEvery } from 'redux-saga/effects';

import { createSagaHandler } from 'src/renderer/flux/saga/utils';
import { toastError } from 'src/renderer/flux/saga/toast';
import { TrainingActions } from 'src/renderer/component/Training/flux/actions';
import { TrainingAPI } from 'src/renderer/API/TrainingAPI';

const sagaLoading = createSagaHandler({
  actionCreators: TrainingActions.loading,
  apiMethod: TrainingAPI.loading,
  responseHandler: response => ({
    training: response.data,
  }),
  callbackIfFailure: () => toastError('Failed training loading'),
});

function* watcher() {
  yield all([
    takeEvery(TrainingActions.loading.REQUEST, sagaLoading),
  ]);
}

export default [
  watcher,
];
