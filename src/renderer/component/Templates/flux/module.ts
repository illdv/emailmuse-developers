import { createAction, createReducer } from 'redux-act';

import { ITemplateAction, ITemplateState } from './interface';
import { ILoadingTemplatePayload } from 'src/renderer/component/Templates/flux/interface';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { ActionStatus } from 'src/renderer/flux/interface';
import { createAsyncAction } from 'src/renderer/flux/utils';

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
export const SAVE_SUCCESS   = `${NS}SAVE_SUCCESS`;
export const COPY   = `${NS}COPY`;

const loading = createAction(LOADING,
  (payload: { page: number, hidePreloader?: boolean } = { page: 1, hidePreloader: false }) => payload);

// TODO: For async action use IAsyncAction and createModuleAction

const failure      = createAction(FAILURE);
const successfully = createAction(LOADED, (payload: ILoadingTemplatePayload) => payload);

const create        = createAction(CREATE, (template: ITemplate) => template);
const select        = createAction(SELECT, (template: ITemplate) => template);
const createSuccess = createAction(CREATE_SUCCESS, (template: ITemplate) => template);
const save          = createAction(SAVE, (payload: { template: ITemplate, saveAndClose: boolean }) => payload);
const remove        = createAction(REMOVE, (templateId: string) => templateId);
const copy          = createAction(COPY, (payload: {id: string}) => payload);

export const TemplateAction: ITemplateAction = {
  loading,
  failure,
  successfully,
  create,
  createSuccess,
  save,
  select,
  remove,
  copy,
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

reducer.on(DrawerMenuAction.selectMenuItem, state => ({
  ...state,
  selectedTemplate: null,
}));

export default reducer;
