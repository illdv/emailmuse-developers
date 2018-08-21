import { AxiosResponse } from 'axios';
import { Action } from 'redux-act';

import { all, call, put, race, take } from 'redux-saga/effects';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { ModalWindowActions, ModalWindowType } from 'src/renderer/common/DialogProvider/flux/actions';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';
import { bindActionCreators } from 'redux';

export function* selectFromModal(type: ModalWindowType) {
  yield put(ModalWindowActions.show.REQUEST({ type }));
  const { success, failure } = yield race({
    success: take(ModalWindowActions.show.SUCCESS),
    failure: take(ModalWindowActions.show.FAILURE),
  });

  return success || null;
}

/**
 * Use for map dispatch actions from Module.
 */
export function bindModuleAction<T>(moduleActions: T, dispatch: any): T {
  return Object.entries(moduleActions).reduce((result, [key, value]): T => {
    result[key] = bindActionCreators(value as any, dispatch);
    return result;
  }, {} as T);
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
  apiMethod?: (L) => AxiosResponse<any>;
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
      if (apiMethod) {
        const dataForApi = creatorDataForApi ? creatorDataForApi(action) : null;
        const response = yield call(apiMethod, dataForApi);
        yield put(actionCreators.SUCCESS(responseHandler(response)));
      }

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
