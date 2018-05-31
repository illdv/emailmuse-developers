import { createAction, createReducer } from 'redux-act';
import { ISnippetsAction, ISnippetsState } from 'src/renderer/component/Snippets/flux/interface';
import { ActionStatus } from 'src/renderer/flux/utils';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { IPagination } from 'src/renderer/common/List/interface';

const REDUCER = 'SNIPPETS';
const NS      = `${REDUCER}__`;

export const LOADING_SNIPPETS = `${NS}LOADING_SNIPPETS`;
export const SUCCESS_SNIPPETS = `${NS}SUCCESS_SNIPPETS`;
export const FAILURE_SNIPPETS = `${NS}FAILURE_SNIPPETS`;

const loading      = createAction(LOADING_SNIPPETS);
const successfully = createAction(SUCCESS_SNIPPETS,
  (payload: {snippet: ISnippet[], pagination: IPagination}) => ({payload}));
const failure      = createAction(FAILURE_SNIPPETS);

export const SnippetsAction: ISnippetsAction = {
  loading,
  failure,
  successfully,
};

const initialState: ISnippetsState = {
  snippet: [],
  pagination: null,
  status: ActionStatus.LOADING,
};

const reducer = createReducer({}, initialState);

reducer.on(successfully, (state, action) => ({
  ...state,
  ...action.payload,
  status: ActionStatus.SUCCESS,
}));

reducer.on(failure, (state, action) => ({
  ...state,
  status: ActionStatus.SUCCESS,
}));

export default reducer;
