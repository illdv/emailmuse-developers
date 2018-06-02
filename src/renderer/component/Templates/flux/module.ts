import { createAction, createReducer } from 'redux-act';

import { ITemplateState } from './models';
import { ILoadingTemplatePayload, TemplateStatus } from 'src/renderer/component/Templates/flux/models';
import { ITemplate } from 'src/renderer/component/Templates/flux/entity';

const REDUCER = 'TEMPLATES';
const NS      = `${REDUCER}__`;

export const LOADING = `${NS}LOADING`;
export const FAILURE = `${NS}FAILURE`;
export const LOADED  = `${NS}LOADED`;

export const CREATE = `${NS}CREATE`;
export const REMOVE = `${NS}REMOVE`;
export const SET    = `${NS}SET`;
export const SELECT = `${NS}SELECT`;
export const ADD    = `${NS}ADD`;
export const CLOSE  = `${NS}CLOSE`;

const loading      = createAction(LOADING, (page: number = 1) => ({ page }));
const failure      = createAction(FAILURE);
const successfully = createAction(LOADED, (payload: ILoadingTemplatePayload) => payload);

const create        = createAction(CREATE, (template: ITemplate) => template);
const set           = createAction(SET, (template: ITemplate) => template);
const add           = createAction(ADD, (template: ITemplate) => template);
const select        = createAction(SELECT, (template: ITemplate) => template);
const remove        = createAction(REMOVE, (templateId: number) => templateId);
const closeTemplate = createAction(CLOSE);

export const TemplateAction = {
  loading,
  failure,
  successfully,
  create,
  set,
  add,
  select,
  remove,
  closeTemplate,
};

const initialState: ITemplateState = {
  status: TemplateStatus.Loading,
  templates: [],
  selectedTemplate: null,
  pagination: null,
};

const reducer = createReducer({}, initialState);

reducer.on(loading, state => ({
  ...state,
  status: TemplateStatus.Loading,
}));

reducer.on(successfully, (state, response): ITemplateState => ({
  ...state,
  ...response,
  status: TemplateStatus.Success,
}));

reducer.on(failure, (state): ITemplateState => ({
  ...state,
  status: TemplateStatus.Failed,
}));

reducer.on(add, (state, template): ITemplateState => ({
  ...state,
  selectedTemplate: template,
  status: TemplateStatus.CreateTemplate,
}));

reducer.on(closeTemplate, (state, template): ITemplateState => ({
  ...state,
  selectedTemplate: null,
  status: TemplateStatus.Success,
}));

reducer.on(select, (state, template): ITemplateState => ({
  ...state,
  selectedTemplate: template,
  status: TemplateStatus.EditTemplate,
}));

reducer.on(set, (state, newTemplate: ITemplate) => {
  const newTemplates = state.templates.map(template => {
    if (template.id === newTemplate.id) {
      return newTemplate;
    }
    return template;
  });

  return {
    ...state,
    templates: newTemplates,
  };
});

export default reducer;
