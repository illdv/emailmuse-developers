import { Action } from 'redux';
import { createAction } from 'redux-actions';

export enum ActionStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

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
 * Create step action LOADING, SUCCESS, FAILURE.
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

export function useOrDefault(func: () => any, defaultValue: string) {
  try {
    return func();
  } catch (e) {
    return defaultValue;
  }
}
