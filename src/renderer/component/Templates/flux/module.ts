import { createAction, createReducer } from 'redux-act';

import { ITemplateState } from './models';
import { ILoadingTemplatePayload, TemplateStatus } from 'src/renderer/component/Templates/flux/models';
import { ITemplate } from 'src/renderer/component/Templates/flux/entity';

const REDUCER = 'TEMPLATES';
const NS      = `${REDUCER}__`;

export const LOADING = `${NS}LOADING`;
export const FAILURE = `${NS}FAILURE`;
export const LOADED  = `${NS}LOADED`;

export const CREATE         = `${NS}CREATE`;
export const CREATE_SUCCESS = `${NS}CREATE_SUCCESS`;

export const REMOVE = `${NS}REMOVE`;
export const SET    = `${NS}SET`;
export const SELECT = `${NS}SELECT`;
export const ADD    = `${NS}ADD`;
export const CLOSE  = `${NS}CLOSE`;

export const loading = createAction(LOADING, (page: number = 1) => ({ page }));
export const failure = createAction(FAILURE);
export const loaded  = createAction(LOADED, (payload: ILoadingTemplatePayload) => payload);

export const create        = createAction(CREATE, (template: ITemplate) => template);
export const createSuccess = createAction(CREATE_SUCCESS, (template: ITemplate) => template);
export const set           = createAction(SET, (template: ITemplate) => template);
export const add           = createAction(ADD, (template: ITemplate) => template);
export const select        = createAction(SELECT, (template: ITemplate) => template);
export const remove        = createAction(REMOVE, (templateId: number) => templateId);
export const closeTemplate = createAction(CLOSE);

const initialState: ITemplateState = {
  status: TemplateStatus.Loading,
  templates: [],
  selectedTemplate: null,
  pagination: null,
};

const reducer = createReducer({}, initialState);

reducer.on(loading, (state) => ({
  ...state,
  status: TemplateStatus.Loading,
}));

reducer.on(loaded, (state, response): ITemplateState => ({
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

reducer.on(remove, (state, templateId: number): ITemplateState => ({
  ...state,
  templates: state.templates.filter((template) => template.id !== templateId),
  status: TemplateStatus.Success,
}));

reducer.on(createSuccess, (state, template: ITemplate): ITemplateState => ({
  ...state,
  pagination: {
    ...state.pagination,
    total: state.pagination.total + 1,
  },
  templates: [...state.templates, template],
  status: TemplateStatus.Success,
}));

reducer.on(set, (state, newTemplate: ITemplate) => {
  const newTemplates = state.templates.map((template) => {
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
