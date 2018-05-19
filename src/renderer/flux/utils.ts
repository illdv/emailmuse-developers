import { Action } from 'redux';
import { createAction } from 'redux-actions';

export interface IActionPayload<T> extends Action {
  payload: T;
}

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
 */
export function createActionSteps(actionName: string, requestHandling, successHandling, failureHandling): IActionSteps {
  const type = {
    REQUEST: `${actionName}_REQUEST`,
    SUCCESS: `${actionName}_REQUEST`,
    FAILURE: `${actionName}_REQUEST`,
  };

  return {
    type,
    REQUEST: createAction(type.REQUEST, requestHandling),
    SUCCESS: createAction(type.SUCCESS, successHandling),
    FAILURE: createAction(type.FAILURE, failureHandling),
  };
}