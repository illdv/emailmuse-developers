import { call, put, take } from 'redux-saga/effects';
import * as constants from 'src/renderer/component/ImageLibrary/store/constants';
import * as actions from 'src/renderer/component/ImageLibrary/store/actions';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';
import { IActionPayload } from 'src/renderer/flux/utils';

function* getImagesWorker(action: IActionPayload<null>): IterableIterator<any> {
  try {
    const response = yield call(EmailerAPI.ImageLibrary.getImages);
    yield put(actions.getImagesSuccess(response.data.data));
  } catch (e) {
    console.log('Getting images failed', e);
    yield put(actions.getImagesFailure());
  }
}

export function* getImagesWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(constants.GET_IMAGES_REQUEST);
    yield call(getImagesWorker, action);
  }
}