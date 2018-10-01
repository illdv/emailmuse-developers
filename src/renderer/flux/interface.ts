import { ComplexActionCreator1 } from 'redux-act';
import { ActionCreatorsMapObject } from 'redux';

export interface IAsyncAction<R, S, F> extends ActionCreatorsMapObject {
  REQUEST: CreateAction<R>;
  SUCCESS: CreateAction<S>;
  FAILURE: CreateAction<F>;
}

export interface IAsyncAction2<R = {}, S = {}> extends ActionCreatorsMapObject {
  REQUEST: CreateAction<R>;
  SUCCESS: CreateAction<S>;
  FAILURE: CreateAction<IPayloadError>;
}

export type CreateAction<T> = ComplexActionCreator1<T, T>;

export interface IPayloadError {
  error?: string;
  status?: number;
}

export enum ActionStatus {
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}
