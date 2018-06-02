import { createReducer } from 'redux-act';
import { ISnippetsAction, ISnippetsState, ISuccessfullyPayload } from 'src/renderer/component/Snippets/flux/interface';
import { ActionStatus, createActionSteps2 } from 'src/renderer/flux/utils';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';

const REDUCER = 'SNIPPETS';
const NS      = `${REDUCER}__`;

export const LOADING_SNIPPETS = `${NS}LOADING_SNIPPETS`;
export const REMOVE_SNIPPETS  = `${NS}REMOVE_SNIPPETS`;
export const ADD_SNIPPETS     = `${NS}ADD_SNIPPETS`;
export const EDIT_SNIPPETS    = `${NS}EDIT_SNIPPETS`;

const loading = createActionSteps2(
  LOADING_SNIPPETS, {
    REQUEST: (payload: { page?: number, shortcut?: string } = { page: 1, shortcut: '' }) => (payload),
    SUCCESS: (payload: ISuccessfullyPayload) => (payload),
    FAILURE: () => ({}),
  },
);

const remove = createActionSteps2(
  REMOVE_SNIPPETS, {
    REQUEST: (payload: { id: string }) => (payload),
    SUCCESS: () => ({}),
    FAILURE: () => ({}),
  },
);

const add = createActionSteps2(
  ADD_SNIPPETS, {
    REQUEST: (payload: { snippet: ISnippet }) => (payload),
    SUCCESS: () => ({}),
    FAILURE: () => ({}),
  },
);

const edit = createActionSteps2(
  EDIT_SNIPPETS, {
    REQUEST: (payload: { snippet: ISnippet }) => (payload),
    SUCCESS: () => ({}),
    FAILURE: () => ({}),
  },
);

export const SnippetsAction: ISnippetsAction = {
  loading,
  remove,
  add,
  edit,
};

const initialState: ISnippetsState = {
  snippets: null,
  pagination: null,
  status: ActionStatus.REQUEST,
};

const reducer = createReducer({}, initialState);

reducer.on(SnippetsAction.loading.REQUEST, state => ({
  ...state,
  status: ActionStatus.REQUEST,
}));

reducer.on(SnippetsAction.add.REQUEST, state => ({
  ...state,
  status: ActionStatus.REQUEST,
}));

reducer.on(SnippetsAction.edit.REQUEST, state => ({
  ...state,
  status: ActionStatus.REQUEST,
}));

reducer.on(SnippetsAction.remove.REQUEST, state => ({
  ...state,
  status: ActionStatus.REQUEST,
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

export default reducer;
