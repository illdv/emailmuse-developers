import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { createAction } from 'redux-act';
import { ISnippetsAction } from 'src/renderer/component/Snippets/flux/interface';
import { createAsyncAction2 } from 'src/renderer/flux/utils';

const REDUCER = 'SNIPPETS';
const NS      = `${REDUCER}__`;

export const LOADING_SNIPPETS = `${NS}LOADING_SNIPPETS`;
export const REMOVE_SNIPPETS  = `${NS}REMOVE_SNIPPETS`;
export const ADD_SNIPPETS     = `${NS}ADD_SNIPPETS`;
export const EDIT_SNIPPETS    = `${NS}EDIT_SNIPPETS`;
export const SELECT_SNIPPET   = `${NS}SELECT_SNIPPET`;
export const SAVE_AND_CLOSE   = `${NS}SAVE_AND_CLOSE`;

// TODO: I use any for experiment. May be don't need add type for createAsyncAction2 because has ISnippetsAction
const loading = createAsyncAction2<any, any>(LOADING_SNIPPETS);
const remove  = createAsyncAction2<any, any>(REMOVE_SNIPPETS);
const add     = createAsyncAction2<any, any>(ADD_SNIPPETS);
const edit    = createAsyncAction2<any, any>(EDIT_SNIPPETS);

const selectSnippet = createAction(SELECT_SNIPPET, (payload: { selectSnippet: ISnippet }) => (payload));

const saveAndClose = createAction(SAVE_AND_CLOSE);

export const SnippetsAction: ISnippetsAction = {
  loading,
  remove,
  add,
  edit,
  selectSnippet,
  saveAndClose,
};
