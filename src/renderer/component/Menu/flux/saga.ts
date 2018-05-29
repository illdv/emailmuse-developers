import { call, put, take } from 'redux-saga/effects';

import { FluxDrawerMenu } from 'src/renderer/component/Menu/flux/action';
import { TemplateAction } from 'src/renderer/component/Templates/flux/module';

function* selectMenuItemWorker(): IterableIterator<any> {
  yield put(TemplateAction.select(null));
}

export function* selectMenuItemWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(FluxDrawerMenu.Actions.selectMenuItem(null).type);
    yield call(selectMenuItemWorker, action);
  }
}
