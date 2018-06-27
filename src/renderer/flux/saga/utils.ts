import { AxiosError, AxiosResponse } from 'axios';
import { Action } from 'redux-act';

import { all, call, put, take } from 'redux-saga/effects';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';

export function* toastSuccess(messages: string) {
  yield put(FluxToast.Actions.showToast.REQUEST({
    messages,
    type: ToastType.Success,
  }));
}

export function* toastError(messages: string) {
  yield put(FluxToast.Actions.showToast.REQUEST({
    messages,
    type: ToastType.Error,
  }));
}

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

export function createWatch(actionCreators: IAsyncAction2<any, any>, handler: (action: any) => void) {
  return function* watchSaga() {
    while (true) {
      const action = yield take(actionCreators.REQUEST(null).type);
      yield call(handler, action);
    }
  };
}

function responseHandlerDefault(response: AxiosResponse<any>) {
  return response.data;
}

/**
 * L - Data for API method
 */
interface ICreateSagaHandlerOptions<R, S, L> {
  actionCreators: IAsyncAction2<R, S>;
  apiMethod: (L) => AxiosResponse<any>;
  responseHandler?: (response: AxiosResponse<any>) => S;
  creatorDataForApi?: (action: Action<R>) => L;
  callbackIfSuccess?: any;
  callbackIfFailure?: () => void;
}

export function createSagaHandler<R, S, L>(option: ICreateSagaHandlerOptions<R, S, L>) {
  const {
          apiMethod,
          creatorDataForApi,
          actionCreators,
          responseHandler = responseHandlerDefault,
          callbackIfSuccess,
          callbackIfFailure,
        } = option;

  return function* saga(action: Action<R>) {
    try {
      const dataForApi = creatorDataForApi ? creatorDataForApi(action) : null;
      const response   = yield call(apiMethod, dataForApi);

      yield put(actionCreators.SUCCESS(responseHandler(response)));

      if (callbackIfSuccess) {
        yield all(callbackIfSuccess);
      }

    } catch (error) {
      if (callbackIfFailure) {
        yield call(callbackIfFailure);
      }
      yield call(errorHandler, error);
      yield put(actionCreators.FAILURE({}));
    }
  };
}
