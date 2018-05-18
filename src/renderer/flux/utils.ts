import { Action } from 'redux';

export type WithoutPayload = IActionPayload<null>;

export interface IActionPayload<T> extends Action {
  payload: T;
}