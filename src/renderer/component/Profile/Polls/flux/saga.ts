import { all, call, put, race, take, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Action } from 'redux-act';

import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';
import { PollsActions } from './actions';
import { IPoll } from './interfase';
import { PollsAPI } from 'src/renderer/API/Polls';

// function* createPolls(template: IPoll) {
//   try {
//     yield call(PollsAPI.createPolls, template);
//     yield put(push('/emails'));
//     yield put(FluxToast.Actions.showToast('Emails created', ToastType.Success));
//   } catch (error) {
//     yield call(errorHandler, error);
//     yield put(FluxToast.Actions.showToast('Failed emails created', ToastType.Error));
//   }
// }
function* getPoll() {
  try {
    yield call(PollsAPI.getPolls);
    yield put(push('/emails'));
    yield put(FluxToast.Actions.showToast('Emails created', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(FluxToast.Actions.showToast('Failed emails created', ToastType.Error));
  }
}

function* watcher() {
  yield all([
    takeEvery(PollsActions.getPoll.REQUEST, getPoll),
  ]);
}

export default [watcher];
