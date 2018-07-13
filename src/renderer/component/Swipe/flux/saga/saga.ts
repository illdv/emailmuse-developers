import { all, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { toastError } from 'src/renderer/flux/saga/toast';
import { createSagaHandler } from 'src/renderer/flux/saga/utils';
import { SwipeAPI } from 'src/renderer/API/SwipeAPI';
import sagaMoveInEmail from 'src/renderer/component/Swipe/flux/saga/sagaMoveInEmail';

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
  ]);
}

export default [
  watcher,
  ...sagaMoveInEmail,
];
