import { all, put, take, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { toastError } from 'src/renderer/flux/saga/toast';
import { createSagaHandler } from 'src/renderer/flux/saga/utils';
import { SwipeAPI } from 'src/renderer/API/SwipeAPI';
import sagaMoveInEmail from 'src/renderer/component/Swipe/flux/saga/sagaMoveInEmail';
import { runTutorial } from 'src/renderer/component/Tutorial/flux/reducer';

function* layoutLoading() {
  if (localStorage.getItem('SWIPE')) {
    yield put(runTutorial({}));
  }
}

const sagaLoading = createSagaHandler({
  actionCreators: SwipeActions.loading,
  apiMethod: SwipeAPI.loading,
  responseHandler: response => ({
    swipes: response.data,
  }),
  callbackIfFailure: () => toastError('Failed swipe loading'),
});

function* watcher() {
  yield all([
    takeEvery(SwipeActions.loading.REQUEST, sagaLoading),
    takeEvery(SwipeActions.loading.SUCCESS, layoutLoading),
  ]);
}

export default [
  watcher,
  ...sagaMoveInEmail,
];
