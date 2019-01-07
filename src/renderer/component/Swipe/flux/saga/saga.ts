import { all, put, take, takeEvery, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { toastError } from 'src/renderer/flux/saga/toast';
import { createSagaHandler } from 'src/renderer/flux/saga/utils';
import { SwipeAPI } from 'src/renderer/API/SwipeAPI';
import sagaMoveInEmail from 'src/renderer/component/Swipe/flux/saga/sagaMoveInEmail';
import { runTutorial } from 'src/renderer/component/Tutorial/flux/reducer';
import { MenuItemType } from 'src/renderer/component/Menu/flux/interface';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { Action } from 'redux-act';
import { clipboard } from 'electron';

function* swipeLoading() {
  const { tutorial } = yield select();

  if (
    localStorage.getItem(MenuItemType.swipes) &&
    tutorial.name === MenuItemType.swipes
  ) {
    yield put(runTutorial({}));
  }
}

function* swipeCopiedUrl(action: Action<{ url: string }>) {
  navigator.platform.includes('Win')
    ? clipboard.writeText(action.payload.url, 'selection')
    : clipboard.writeText(action.payload.url);

  yield put(
    FluxToast.Actions.showToast('Url copied in clipboard', ToastType.Success),
  );
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
    takeEvery(SwipeActions.loading.SUCCESS, swipeLoading),
    takeEvery(SwipeActions.copiedUrl.SUCCESS, swipeCopiedUrl),
  ]);
}

export default [watcher, ...sagaMoveInEmail];
