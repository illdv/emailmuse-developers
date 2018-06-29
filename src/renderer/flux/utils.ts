import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { createAction as createAction2 } from 'redux-act';
import { IAsyncAction, IAsyncAction2, IPayloadError } from 'src/renderer/flux/interface';

/**
 * @deprecated use import { Action } from 'redux-act';
 */
export interface IActionPayload<T> extends Action {
  payload: T;
}

/**
 * @deprecated use IActionSteps2
 */
export interface IActionSteps {
  type: {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string;
  };
  REQUEST: any;
  SUCCESS: any;
  FAILURE: any;
}

/**
 * Create step action REQUEST, SUCCESS, FAILURE.
 * @deprecated use createModuleAction
 */
export function createActionSteps(actionName: string, requestHandling, successHandling, failureHandling): IActionSteps {
  const type = {
    REQUEST: `${actionName}_REQUEST`,
    SUCCESS: `${actionName}_SUCCESS`,
    FAILURE: `${actionName}_FAILURE`,
  };

  return {
    type,
    REQUEST: createAction(type.REQUEST, requestHandling),
    SUCCESS: createAction(type.SUCCESS, successHandling),
    FAILURE: createAction(type.FAILURE, failureHandling),
  };
}

/**
 * Create step action REQUEST, SUCCESS, FAILURE.
 * @deprecated use createAsyncAction2
 */
export function createAsyncAction<R, S, F>(actionName: string, steps: IAsyncAction<R, S, F>) {
  const type = {
    REQUEST: `${actionName}_REQUEST`,
    SUCCESS: `${actionName}_SUCCESS`,
    FAILURE: `${actionName}_FAILURE`,
  };

  return {
    REQUEST: createAction2(type.REQUEST, steps.REQUEST),
    SUCCESS: createAction2(type.SUCCESS, steps.SUCCESS),
    FAILURE: createAction2(type.FAILURE, steps.FAILURE),
  };
}

function helperCreateAction<R, S, F>(actionName: string): IAsyncAction<R, S, F> {
  const type = {
    REQUEST: `${actionName}_REQUEST`,
    SUCCESS: `${actionName}_SUCCESS`,
    FAILURE: `${actionName}_FAILURE`,
  };

  return {
    REQUEST: createAction2(type.REQUEST, (payload: R) => payload),
    SUCCESS: createAction2(type.SUCCESS, (payload: S) => payload),
    FAILURE: createAction2(type.FAILURE, (payload: F) => payload),
  };
}

export function createAsyncAction2<R, S>(actionName: string): IAsyncAction<R, S, IPayloadError>  {
  return helperCreateAction<R, S, IPayloadError>(actionName);
}

// TODO: bad name
export const createActionCreator = (reducer: string) => (actionType: string) => {
  return createAsyncAction2<any, any>(`${reducer}__${actionType}`);
};
