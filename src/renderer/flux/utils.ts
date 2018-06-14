import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { createAction as createAction2 } from 'redux-act';

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
 * @deprecated use createAsyncAction
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

export interface IActionSteps2<R, S, F> {
  REQUEST: (payload: R) => R;
  SUCCESS: (payload: S) => S;
  FAILURE: (payload: F) => F;
}

export function createAsyncAction<R, S, F>(actionName: string, steps: IActionSteps2<R, S, F>) {
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
