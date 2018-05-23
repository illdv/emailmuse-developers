import { call, put, select, take } from 'redux-saga/effects';
import * as constants from 'src/renderer/component/ImageLibrary/store/constants';
import * as actions from 'src/renderer/component/ImageLibrary/store/actions';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';
import { IActionPayload } from 'src/renderer/flux/utils';
import { getCurrentPageSelector, getTotalImages, getPerPageSelector, getLastPageSelector } from
    'src/renderer/component/ImageLibrary/store/selectors';

function* deleteImagesWorker(action: IActionPayload<number[]>): IterableIterator<any> {
  try {
    const response = yield call(EmailerAPI.ImageLibrary.deleteImages, action.payload);
    yield put(actions.deleteImagesSuccess());
    // If page should change after deleting then change currentPage
    let currentPage = yield select(getCurrentPageSelector);
    const lastPage = yield select(getLastPageSelector);
    const totalImages = yield select(getTotalImages);
    const perPage = yield select(getPerPageSelector);
    if (currentPage && currentPage === lastPage && totalImages) {
      currentPage = Math.ceil((totalImages-action.payload.length)/perPage);
    }
    // Request currentPage;
    // It's okay if somehow currentPage === undefined or null at this point,
    // because related checks are made in getImagesWorker saga
    yield put(actions.getImagesRequest(currentPage));
  } catch (e) {
    console.log('Deleting images failed: ', e);
    yield put(actions.deleteImagesFailure());
  }
}

export function* deleteImagesWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(constants.DELETE_IMAGES_REQUEST);
    yield call(deleteImagesWorker, action);
  }
}