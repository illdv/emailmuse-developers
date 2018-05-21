import { call, put, take } from 'redux-saga/effects';
import * as constants from 'src/renderer/component/ImageLibrary/store/constants';
import * as actions from 'src/renderer/component/ImageLibrary/store/actions';
import { IActionPayload } from 'src/renderer/flux/utils';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';

function* getImagesWorker(action: IActionPayload<null>): IterableIterator<any> {
  try {
    console.log('Getting images...');
    const images = yield call(EmailerAPI.ImageLibrary.getImages);
    put(actions.getImagesSuccess(images));
  } catch (e) {
    console.log('Getting images failed', e);
    put(actions.getImagesFailure());
  }
}

export function* getImagesWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(constants.GET_IMAGES_REQUEST);
    yield call(getImagesWorker, action);
  }
}