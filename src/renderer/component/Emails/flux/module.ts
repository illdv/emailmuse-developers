import { createAction, createReducer } from 'redux-act';

import { IEmailActions, IEmailsState } from './interface';
import { ILoadingTemplatePayload } from 'src/renderer/component/Emails/flux/interface';
import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { ActionStatus, CreateAction } from 'src/renderer/flux/interface';

const REDUCER = 'EMAILS';
const NS      = `${REDUCER}__`;

export const LOADING = `${NS}LOADING`;
export const FAILURE = `${NS}FAILURE`;
export const LOADED  = `${NS}LOADED`;

export const CREATE = `${NS}CREATE`;
export const CREATE_SUCCESS = `${NS}CREATE_SUCCESS`;
export const SELECT = `${NS}SELECT`;
export const REMOVE = `${NS}REMOVE`;
export const SAVE = `${NS}SAVE`;
export const COPY = `${NS}COPY`;
export const SELECT_NEW_TEMPLATE = `${NS}SELECT_NEW_TEMPLATE`;
export const GET_FROM_FOLDER = `${NS}GET_FROM_FOLDER`;

/*const loading = createAction(LOADING,
  (payload: { page: number, hidePreloader?: boolean, search?: string } = {
    page: 1,
    hidePreloader: false,
    search: '',
  }) => payload);*/
const loading = createAction(LOADING);
const failure      = createAction(FAILURE);
const successfully = createAction(LOADED, (emails: IEmail[]) => emails);

const create = createAction(CREATE, (email: IEmail) => email);
const select = createAction(SELECT, (email: IEmail) => email);
const createSuccess = createAction(CREATE_SUCCESS, (template: IEmail[]) => template);
const save = createAction(SAVE, (payload: { email: IEmail, saveAndClose: boolean }) => payload);
const remove            = createAction(REMOVE, (templateId: string) => templateId);
const copy              = createAction(COPY, (payload: { id: string }) => payload);
const selectNewTemplate = createAction(SELECT_NEW_TEMPLATE, (payload: { parentId: number }) => payload);
const getEmailFromFolder = createAction(GET_FROM_FOLDER, (payload: { parentId: number }) => payload);

export const EmailActions: IEmailActions = {
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
  getEmailFromFolder,
};

const initialState: IEmailsState = {
  emails: [],
  selectedEmail: null,
  status: ActionStatus.REQUEST,
};

const reducer = createReducer({}, initialState);

// reducer.on(loading, (state, payload) => ({
//   ...state,
//   status: payload.hidePreloader ? ActionStatus.SUCCESS : ActionStatus.REQUEST,
// }));

reducer.on(save, state => ({
  ...state,
  lastCreatedId: null,
}));

reducer.on(successfully, (state, response): IEmailsState => ({
  ...state,
  emails: response,
  status: ActionStatus.SUCCESS,
}));

reducer.on(failure, (state): IEmailsState => ({
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
