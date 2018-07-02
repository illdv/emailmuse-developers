import { createReducer } from 'redux-act';
import { createAsyncAction2 } from 'src/renderer/flux/utils';
import { ILayout, ILayoutActions, ILayoutState } from 'src/renderer/component/Layouts/flux/interface';
import { IPagination } from 'src/renderer/common/List/interface';

const REDUCER = 'LAYOUT';
const NS      = `${REDUCER}__`;

export const LOADING = `${NS}LOADING`;
export const CREATE  = `${NS}CREATE`;
export const EDIT    = `${NS}EDIT`;
export const REMOVE  = `${NS}REMOVE`;

const loading = createAsyncAction2<{ page?: number }, { layouts: ILayout[], pagination: IPagination }>(LOADING);
const create  = createAsyncAction2<{ layout: ILayout }, {}>(CREATE);
const edit    = createAsyncAction2<{ layout: ILayout }, {}>(EDIT);
const remove  = createAsyncAction2<{id: string[]}, {}>(REMOVE);

export const LayoutActions: ILayoutActions = {
  loading,
  create,
  edit,
  remove,
};

const defaultState: ILayoutState = {
  layouts: [],
  pagination: null,
};

const reducer = createReducer({}, defaultState);

reducer.on(loading.SUCCESS, (state, payload): ILayoutState => ({
  ...state,
  ...payload,
}));

export default reducer;
