import { put } from 'redux-saga/effects';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';

export function* toastSuccess(messages: string) {
  yield put(FluxToast.Actions.showToast(messages, ToastType.Success));
}

export function* toastError(messages: string) {
  yield put(FluxToast.Actions.showToast(messages, ToastType.Error));
}
