import { call, put, take } from 'redux-saga/effects';
import * as constants from 'src/renderer/component/ImageLibrary/store/constants';
import * as actions from 'src/renderer/component/ImageLibrary/store/actions';
import { IActionPayload } from 'src/renderer/flux/utils';
import { getImages } from 'src/renderer/API/ImageLibrary';

function* getImagesWorker(action: IActionPayload<number>): IterableIterator<any> {
  try {
    // Check for page === undefined || null
    let requestedPage = action.payload || 1;
    // Check for page < 1
    if (requestedPage < 1) {
      requestedPage = 1;
    }
    let response = yield call(getImages, requestedPage);
    const currentPage = response.data.current_page;
    const lastPage = response.data.last_page;
    // Check for current page > last page
    if (currentPage > lastPage) {
      response = yield call (getImages, lastPage || 1);
    }
    yield put(actions.getImagesSuccess(response.data));
  } catch (e) {
    console.log('Getting images failed: ', e);
    yield put(actions.getImagesFailure());
  }
}

export function* getImagesWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(constants.GET_IMAGES_REQUEST);
    yield call(getImagesWorker, action);
  }
}