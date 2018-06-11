import { createAction, createReducer } from 'redux-act';

import { ISnippetsAction, ISnippetsState, ISuccessfullyPayload } from 'src/renderer/component/Snippets/flux/interface';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { createAsyncAction } from 'src/renderer/flux/utils';
import { ActionStatus } from 'src/renderer/flux/interface';

const REDUCER = 'SNIPPETS';
const NS      = `${REDUCER}__`;

export const LOADING_SNIPPETS = `${NS}LOADING_SNIPPETS`;
export const REMOVE_SNIPPETS  = `${NS}REMOVE_SNIPPETS`;
export const ADD_SNIPPETS     = `${NS}ADD_SNIPPETS`;
export const EDIT_SNIPPETS    = `${NS}EDIT_SNIPPETS`;
export const SELECT_SNIPPET   = `${NS}SELECT_SNIPPET`;
export const SAVE_AND_CLOSE   = `${NS}SAVE_AND_CLOSE`;

const loading = createAsyncAction(
  LOADING_SNIPPETS, {
    REQUEST: (payload: { page?: number, shortcut?: string } = { page: 1, shortcut: '' }) => (payload),
    SUCCESS: (payload: ISuccessfullyPayload) => (payload),
    FAILURE: () => ({}),
  },
);

const remove = createAsyncAction(
  REMOVE_SNIPPETS, {
    REQUEST: (payload: { id: string }) => (payload),
    SUCCESS: () => ({}),
    FAILURE: () => ({}),
  },
);

const add = createAsyncAction(
  ADD_SNIPPETS, {
    REQUEST: (payload: { snippet: ISnippet }) => (payload),
    SUCCESS: (payload: { snippet: ISnippet }) => (payload),
    FAILURE: () => ({}),
  },
);

const edit = createAsyncAction(
  EDIT_SNIPPETS, {
    REQUEST: (payload: { snippet: ISnippet }) => (payload),
    SUCCESS: () => ({}),
    FAILURE: () => ({}),
  },
);

const saveAndClose = createAction(SAVE_AND_CLOSE);

const selectSnippet = createAction(SELECT_SNIPPET, (payload: { selectSnippet: ISnippet }) => (payload));

export const SnippetsAction: ISnippetsAction = {
  loading,
  remove,
  add,
  edit,
  selectSnippet,
  saveAndClose,
};

const initialState = (): ISnippetsState  => ({
  snippets: null,
  pagination: null,
  status: ActionStatus.REQUEST,
  selectSnippet: null,
});

const reducer = createReducer({}, initialState());

reducer.on(SnippetsAction.loading.REQUEST, state => ({
  ...state,
  status: ActionStatus.REQUEST,
}));

reducer.on(SnippetsAction.add.REQUEST, state => ({
  ...state,
  status: ActionStatus.REQUEST,
}));

reducer.on(SnippetsAction.add.SUCCESS, (state, payload): ISnippetsState => ({
  ...state,
  selectSnippet: payload.snippet,
  status: ActionStatus.SUCCESS,
}));

reducer.on(SnippetsAction.edit.REQUEST, state => ({
  ...state,
  status: ActionStatus.REQUEST,
}));

reducer.on(SnippetsAction.remove.REQUEST, state => ({
  ...state,
  status: ActionStatus.REQUEST,
}));

reducer.on(SnippetsAction.remove.SUCCESS, state => ({
  ...state,
  selectSnippet: null,
  status: ActionStatus.SUCCESS,
}));

reducer.on(SnippetsAction.loading.SUCCESS, (state, payload) => ({
  ...state,
  ...payload,
  status: ActionStatus.SUCCESS,
}));

reducer.on(SnippetsAction.loading.FAILURE, state => ({
  ...state,
  status: ActionStatus.FAILURE,
}));

reducer.on(SnippetsAction.selectSnippet, (state, payload): ISnippetsState => ({
  ...state,
  selectSnippet: payload.selectSnippet,
}));

/*reducer.on(DrawerMenuAction.selectMenuItem, (state): ISnippetsState  => ({
  ...state,
  selectSnippet: null,
}));*/

export default reducer;
