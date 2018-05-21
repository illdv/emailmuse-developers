import { call, take } from 'redux-saga/effects';
import * as constants from 'src/renderer/component/ImageLibrary/store/constants';
import * as actions from 'src/renderer/component/ImageLibrary/store/actions';
import { IActionPayload } from 'src/renderer/flux/utils';

function* deleteImagesWorker(action: IActionPayload<{ ids: number[] }>): IterableIterator<any> {
  try {
    console.log('Deleting images', action.payload.ids);
  } catch (e) {
    console.log(e);
  }
}

export function* deleteImagesWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(constants.DELETE_IMAGES_REQUEST);
    yield call(deleteImagesWorker, action);
  }
}