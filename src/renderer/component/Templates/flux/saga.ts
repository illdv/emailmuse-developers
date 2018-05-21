import { take, call, put, select } from 'redux-saga/effects';

import { LOADING, CHANGE, CREATE, failure, loaded, } from './module';
import { Templates } from 'src/renderer/API/EmailerAPI';
import { FluxToast } from 'src/renderer/component/Toast/flux/actions';

export function* loadingTemplates(action) {
  try {
    const response = yield call(Templates.getTemplates);
    yield put(loaded(response.data));
  } catch (error) {
    // log
    yield put(failure());
  }
}

export function* watchLoading() {
  while (true) {
    const data = yield take(LOADING);
    yield call(loadingTemplates, data);
  }
}

export function* changeTemplate(isChange, action) {
  try {
    const response = yield call(isChange ? Templates.editTemplate : Templates.saveTemplate, action.payload);
    yield put(FluxToast.Actions.setError('Success. Tost is not used'));
  } catch (error) {
    yield put(FluxToast.Actions.setError('Error'));
  }
}

export function* watherChange() {
  while (true) {
    const data = yield take(CHANGE);
    yield call(changeTemplate, true, data);
  }
}

export function* watherCreate() {
  while (true) {
    const data = yield take(CREATE);
    yield call(changeTemplate, false, data);
  }
}

export default [watchLoading, watherChange, watherCreate];