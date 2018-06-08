import { createAction, createReducer } from 'redux-act';

import { ITemplateState } from './models';
import { ILoadingTemplatePayload } from 'src/renderer/component/Templates/flux/models';
import { ITemplate } from 'src/renderer/component/Templates/flux/entity';
import { ActionStatus } from 'src/renderer/flux/utils';

const REDUCER = 'TEMPLATES';
const NS      = `${REDUCER}__`;

export const LOADING = `${NS}LOADING`;
export const FAILURE = `${NS}FAILURE`;
export const LOADED  = `${NS}LOADED`;

export const CREATE         = `${NS}CREATE`;
export const CREATE_SUCCESS = `${NS}CREATE_SUCCESS`;
export const SELECT         = `${NS}SELECT`;
export const REMOVE         = `${NS}REMOVE`;
export const SAVE           = `${NS}SAVE`;

const loading = createAction(LOADING,
  (payload: { page: number, hidePreloader?: boolean } = { page: 1, hidePreloader: false }) => payload);

const failure      = createAction(FAILURE);
const successfully = createAction(LOADED, (payload: ILoadingTemplatePayload) => payload);

const create        = createAction(CREATE, (template: ITemplate) => template);
const select        = createAction(SELECT, (template: ITemplate) => template);
const createSuccess = createAction(CREATE_SUCCESS, (template: ITemplate) => template);
const save          = createAction(SAVE, (template: ITemplate) => template);
const remove        = createAction(REMOVE, (templateId: number) => templateId);

export const TemplateAction = {
  loading,
  failure,
  successfully,
  create,
  createSuccess,
  save,
  select,
  remove,
};

const initialState: ITemplateState = {
  templates: [],
  pagination: null,
  selectedTemplate: null,
  status: ActionStatus.REQUEST,
};

const reducer = createReducer({}, initialState);

reducer.on(loading, (state, payload) => ({
  ...state,
  status: payload.hidePreloader ? ActionStatus.SUCCESS : ActionStatus.REQUEST,
}));

reducer.on(save, state => ({
  ...state,
  lastCreatedId: null,
}));

reducer.on(successfully, (state, response): ITemplateState => ({
  ...state,
  ...response,
  status: ActionStatus.SUCCESS,
}));

reducer.on(failure, (state): ITemplateState => ({
  ...state,
  status: ActionStatus.FAILURE,
}));

reducer.on(remove, state => ({
  ...state,
  selectedTemplate: null,
  status: ActionStatus.REQUEST,
}));

reducer.on(createSuccess, (state, payload) => ({
  ...state,
  selectedTemplate: payload,
  status: ActionStatus.SUCCESS,
}));

reducer.on(select, (state, payload) => ({
  ...state,
  selectedTemplate: payload,
  status: ActionStatus.SUCCESS,
}));

export default reducer;
