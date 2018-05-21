import { call, put, take } from 'redux-saga/effects';
import * as constants from 'src/renderer/component/ImageLibrary/store/constants';
import * as actions from 'src/renderer/component/ImageLibrary/store/actions';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';
import { IActionPayload } from 'src/renderer/flux/utils';

function* updateImageWorker(action: IActionPayload<{ imageId: number, name: string }>): IterableIterator<any> {
  try {
    // console.log('updating image', action.payload.imageId, action.payload.name);
    const response = yield call(EmailerAPI.ImageLibrary.updateImage, action.payload.imageId, action.payload.name);
    yield put(actions.updateImageSuccess());
    yield put(actions.getImagesRequest());
  } catch (e) {
    console.log('Updating image failed: ', e);
    yield put(actions.updateImageFailure());
  }
}

export function* updateImageWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(constants.UPDATE_IMAGE_REQUEST);
    yield call(updateImageWorker, action);
  }
}