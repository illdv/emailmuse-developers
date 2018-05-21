import { call, take } from 'redux-saga/effects';
import * as actions from 'src/renderer/component/ImageLibrary/store/constants';
import { IActionPayload } from 'src/renderer/flux/utils';

function* getImagesWorker(action: IActionPayload<null>): IterableIterator<any> {
  try {
    console.log('Getting images...');
  } catch (e) {
    console.log(e);
  }
}

export function* getImagesWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(actions.GET_IMAGES_REQUEST);
    yield call(getImagesWorker, action);
  }
}