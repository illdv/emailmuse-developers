import { call, put, take } from 'redux-saga/effects';
import * as constants from 'src/renderer/component/ImageLibrary/store/constants';
import * as actions from 'src/renderer/component/ImageLibrary/store/actions';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';
import { IActionPayload } from 'src/renderer/flux/utils';

function* deleteImagesWorker(action: IActionPayload<number[]>): IterableIterator<any> {
  try {
    const response = yield call(EmailerAPI.ImageLibrary.deleteImages, action.payload);
    yield put(actions.deleteImagesSuccess());
    yield put(actions.getImagesRequest());
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