import { ComplexActionCreator, ComplexActionCreator1, ComplexActionCreator2 } from 'redux-act';
import { ActionCreatorsMapObject } from 'redux';

export interface IAsyncAction<R, S, F> extends ActionCreatorsMapObject {
  REQUEST: Action<R>;
  SUCCESS: Action<S>;
  FAILURE: Action<F>;
}

export type Action<T> = ComplexActionCreator1<T, T>;

export enum ActionStatus {
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}
