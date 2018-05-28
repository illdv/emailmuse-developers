import { call, put, take, select } from 'redux-saga/effects';

import { IActionPayload } from 'src/renderer/flux/utils';
import { updateImage } from 'src/renderer/API/ImageLibrary';
import { FluxDrawerMenu } from 'src/renderer/component/Menu/flux/action';

function* selectMenuItemWorker(action: IActionPayload<{ imageId: number, name: string }>): IterableIterator<any> {
  yield call(updateImage, action.payload.imageId, action.payload.name);
}

export function* selectMenuItemWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(FluxDrawerMenu.Actions.selectMenuItem(null).type);
    yield call(selectMenuItemWorker, action);
  }
}