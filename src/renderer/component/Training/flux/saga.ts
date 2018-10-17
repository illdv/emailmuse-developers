import { push } from 'react-router-redux';
import { all, call, put, take, takeEvery } from 'redux-saga/effects';

import { createSagaHandler } from 'src/renderer/flux/saga/utils';
import { toastError } from 'src/renderer/flux/saga/toast';
import { TrainingActions } from 'src/renderer/component/Training/flux/actions';
import { TrainingAPI } from 'src/renderer/API/TrainingAPI';
import { runTutorial } from 'src/renderer/component/Tutorial/flux/reducer';

function* layoutLoading() {
  if (localStorage.getItem('TRAINING')) {
    yield put(runTutorial({}));
  }
}

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
    takeEvery(TrainingActions.loading.SUCCESS, layoutLoading),
  ]);
}

export default [
  watcher,
];
