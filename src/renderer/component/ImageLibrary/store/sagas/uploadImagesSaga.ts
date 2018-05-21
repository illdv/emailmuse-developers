import { call, take } from 'redux-saga/effects';
import * as actions from 'src/renderer/component/ImageLibrary/store/constants';
import { IActionPayload } from 'src/renderer/flux/utils';

function* uploadImagesWorker(action: IActionPayload<{ files: File[] }>): IterableIterator<any> {
  try {
    console.log('Uploading images', action.payload.files);
  } catch (e) {
    console.log(e);
  }
}

export function* uploadImagesWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(actions.UPLOAD_IMAGES_REQUEST);
    yield call(uploadImagesWorker, action);
  }
}