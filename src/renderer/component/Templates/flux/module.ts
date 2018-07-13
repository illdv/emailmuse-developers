import { createAction, createReducer } from 'redux-act';

import { ITemplateActions, ITemplateState } from './interface';
import { ILoadingTemplatePayload } from 'src/renderer/component/Templates/flux/interface';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { ActionStatus } from 'src/renderer/flux/interface';

const REDUCER = 'TEMPLATES';
const NS      = `${REDUCER}__`;

export const LOADING = `${NS}LOADING`;
export const FAILURE = `${NS}FAILURE`;
export const LOADED  = `${NS}LOADED`;

export const CREATE              = `${NS}CREATE`;
export const CREATE_SUCCESS      = `${NS}CREATE_SUCCESS`;
export const SELECT              = `${NS}SELECT`;
export const REMOVE              = `${NS}REMOVE`;
export const SAVE                = `${NS}SAVE`;
export const COPY                = `${NS}COPY`;
export const SELECT_NEW_TEMPLATE = `${NS}SELECT_NEW_TEMPLATE`;

// TODO: Need refactoring this

const loading = createAction(LOADING,
  (payload: { page: number, hidePreloader?: boolean, search?: string } = { page: 1, hidePreloader: false, search: ''}) => payload);

const failure      = createAction(FAILURE);
const successfully = createAction(LOADED, (payload: ILoadingTemplatePayload) => payload);

const create            = createAction(CREATE, (template: ITemplate) => template);
const select            = createAction(SELECT, (template: ITemplate) => template);
const createSuccess     = createAction(CREATE_SUCCESS, (template: ITemplate[]) => template);
const save              = createAction(SAVE, (payload: { template: ITemplate, saveAndClose: boolean }) => payload);
const remove            = createAction(REMOVE, (templateId: string) => templateId);
const copy              = createAction(COPY, (payload: { id: string }) => payload);
const selectNewTemplate = createAction(SELECT_NEW_TEMPLATE);

export const TemplateActions: ITemplateActions = {
  loading,
  failure,
  successfully,
  create,
  createSuccess,
  save,
  select,
  remove,
  copy,
  selectNewTemplate,
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
  status: ActionStatus.SUCCESS,
}));

reducer.on(DrawerMenuAction.selectMenuItem, state => ({
  ...state,
  selectedTemplate: null,
}));

export default reducer;
