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
  if (error.response.status === 422) {
    const errors          = error.response.data.errors;
    const keyFirstElement = Object.keys(errors)[0];
    return errors[keyFirstElement];
  }
  if (error.response.status === 400) {
    return error.response.data.message;
  }
  if (error.response.status === 401) {
    yield put(AuthorisationActions.logout.REQUEST({}));
    return error.response.data.message;
  }
  console.log(error);
  return 'Error undefined';
}
