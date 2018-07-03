import { call, put } from 'redux-saga/effects';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { AxiosError } from 'axios';
import { toastError } from 'src/renderer/flux/saga/toast';

export function* errorHandler(error: AxiosError) {
  const messages = yield extractMessages(error);
  yield call(toastError, messages);
}

export function* extractMessages(error: AxiosError) {
  if (!error.response) {
    return error.message;
  }
  const status = error.response.status;
  if (status === 422) {
    const errors          = error.response.data.errors;
    const keyFirstElement = Object.keys(errors)[0];
    return errors[keyFirstElement];
  }
  if (status === 401) {
    yield put(AuthorisationActions.logout.REQUEST({}));
    return error.response.data.message;
  }
  return error.response.data.message;
}
