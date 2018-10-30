import { call, put, take, select } from 'redux-saga/effects';
import * as constants from 'src/renderer/component/ImageLibrary/store/constants';
import * as actions from 'src/renderer/component/ImageLibrary/store/actions';
import { IActionPayload } from 'src/renderer/flux/utils';
import { getImages } from 'src/renderer/API/ImageLibraryAPI';
import { runTutorial } from 'src/renderer/component/Tutorial/flux/reducer';
import { MenuItemType } from 'src/renderer/component/Menu/flux/interface';

function* getImagesWorker(
  action: IActionPayload<{ page: number; name: string }>,
): IterableIterator<any> {
  try {
    // Check for currentPage === undefined || null
    let requestedPage = action.payload.page || 1;
    // Check for currentPage < 1
    if (requestedPage < 1) {
      requestedPage = 1;
    }
    let response = yield call(getImages, requestedPage, action.payload.name);
    const currentPage = response.data.currentPage;
    const lastPage = response.data.lastPage;
    // Check for current currentPage > last currentPage
    if (currentPage > lastPage) {
      response = yield call(getImages, lastPage || 1);
    }
    yield put(actions.getImagesSuccess(response.data));
    const { tutorial } = yield select();

    if (
      localStorage.getItem(MenuItemType.IMAGE_LIBRARY) &&
      tutorial.name === MenuItemType.IMAGE_LIBRARY
    ) {
      yield put(runTutorial({}));
    }
  } catch (e) {
    yield put(actions.getImagesFailure());
  }
}

export function* getImagesWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(constants.GET_IMAGES_REQUEST);
    yield call(getImagesWorker, action);
  }
}
