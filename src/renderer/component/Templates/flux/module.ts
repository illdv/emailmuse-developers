import { createAction, createReducer } from 'redux-act';

import {
  ITemplate,
  ITemplateState,
  IResponseTemplates,
  IDataForEditTemplate,
  IDataForCreateTemplate,
  IDataForDeleteTemplates,
} from '../models';

const REDUCER = 'TEMPLATES';
const NS      = `${REDUCER}__`;

export const UPDATE_CHANGED  = `${NS}UPDATE_CHANGED`;
export const CLEAR_PAGES     = `${NS}CLEAR_PAGES`;
export const LOADING         = `${NS}LOADING`;
export const FAILURE         = `${NS}FAILURE`;
export const LOADED          = `${NS}LOADED`;
export const CREATE          = `${NS}CREATE`;
export const REMOVE          = `${NS}REMOVE`;
export const EDIT            = `${NS}EDIT`;
export const SET_OPEN_DIALOG = `${NS}SET_OPEN_DIALOG`;


export const loading       = createAction(LOADING);
export const failure       = createAction(FAILURE);
export const loaded        = createAction(LOADED, response => response);
export const create        = createAction(CREATE, (data: IDataForCreateTemplate) => data);
export const edit          = createAction(EDIT, (data: IDataForEditTemplate) => data);
export const remove        = createAction(REMOVE, (data: IDataForDeleteTemplates) => data);
export const clearPages    = createAction(CLEAR_PAGES, (data: ITemplate) => data);
export const updateChanged = createAction(UPDATE_CHANGED, (data: ITemplate) => data);
export const setOpenDialog = createAction(SET_OPEN_DIALOG, (isOpen: boolean) => ({ isDialogSelectImageOpen: isOpen }));

const initialState: ITemplateState = {
  status: undefined,
  pages: {},
  isDialogSelectImageOpen: false,
};

const reducer = createReducer({}, initialState);

reducer.on(setOpenDialog, (state, response) => ({
  ...state,
  ...response,
}));

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

reducer.on(updateChanged, (state, updatedTemplate: IDataForEditTemplate) => {
  const updatedPages = Object.keys(state.pages).reduce((acc: any, key: any): any => {
    acc[key] = state.pages[key].map((trmplate: ITemplate) => {
      if (trmplate.id === updatedTemplate.id) {
        return updatedTemplate;
      }
      return trmplate;
    });
    return acc;
  }, {});

  return {
    ...state,
    pages: updatedPages
  };
});

reducer.on(clearPages, (state, newTempate: ITemplate) => {
  // refactor
  return {
    ...state,
    pages: {}
  };
});

export default reducer;