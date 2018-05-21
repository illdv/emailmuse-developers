import { take, call, put, select } from 'redux-saga/effects';

import { LOADING, failure, loaded } from './module';
import { Templates } from 'src/renderer/API/EmailerAPI';

export function* loadingTemplates(action) {
    try {
        const response = yield call(Templates.getTemplates);
        yield put(loaded(response));
    } catch (error) {
        // log
        yield put(failure());
    }
}

export function* watchLoading(){
    while (true) {
        const data = yield take(LOADING);
        yield call(loadingTemplates, data);
    }
}

export default [watchLoading];