import { call, take } from 'redux-saga/effects';
import * as constants from 'src/renderer/component/ImageLibrary/store/constants';
import * as actions from 'src/renderer/component/ImageLibrary/store/actions';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';
import { IActionPayload } from 'src/renderer/flux/utils';

function* updateImageWorker(action: IActionPayload<{ imageId: number, name: string }>): IterableIterator<any> {
  try {
    console.log('updating image', action.payload.imageId, action.payload.name);
  } catch (e) {
    console.log(e);
  }
}

export function* updateImageWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(constants.UPDATE_IMAGE_REQUEST);
    yield call(updateImageWorker, action);
  }
}