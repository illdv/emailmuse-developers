import { createAction, createReducer } from 'redux-act';
import { Action } from 'redux';

import { ITemplateState, IResponseTemplates } from '../models';

const REDUCER = 'TEMPLATES';
const NS = `${REDUCER}__`;

export const LOADING = `${NS}LOADING`;
export const LOADED =  `${NS}LOADED`;
export const FAILURE = `${NS}FAILURE`;
export const CHANGE = `${NS}CHANGE`;
export const CREATE = `${NS}CREATE`;


export const loading = createAction(LOADING);
export const loaded =  createAction(LOADED, response => response);
export const failure = createAction(FAILURE);
export const change = createAction(CHANGE, payload => payload);
export const create = createAction(CREATE, payload => payload);

const initialState: ITemplateState = {
    status: undefined,
    pages: {}
};

const reducer = createReducer({}, initialState);

reducer.on(loading, (state) => ({
    ...state,
    status: LOADING
}));

reducer.on(loaded, (state, response: IResponseTemplates) => ({
    ...state,
    status: LOADED,
    pages: { ...state.pages, [response.current_page]: response.data }
}));

reducer.on(failure, (state) => ({
    ...state,
    status: FAILURE
}));

export default reducer;