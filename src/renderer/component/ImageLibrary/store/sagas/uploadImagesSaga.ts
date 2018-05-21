import { call, put, take } from 'redux-saga/effects';
import * as constants from 'src/renderer/component/ImageLibrary/store/constants';
import * as actions from 'src/renderer/component/ImageLibrary/store/actions';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';
import { IActionPayload } from 'src/renderer/flux/utils';

function* uploadImagesWorker(action: IActionPayload<File[]>): IterableIterator<any> {
  try {
    const response = yield call(EmailerAPI.ImageLibrary.uploadImages, action.payload);
    yield put(actions.uploadImagesSuccess());
    yield put(actions.getImagesRequest());
  } catch (e) {
    console.log('Uploading images failed: ', e);
    yield put(actions.uploadImagesFailure());
  }
}

export function* uploadImagesWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(constants.UPLOAD_IMAGES_REQUEST);
    yield call(uploadImagesWorker, action);
  }
}