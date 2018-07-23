import { createReducer } from 'redux-act';

import { ISnippetsState } from 'src/renderer/component/Snippets/flux/interface';
import { ActionStatus } from 'src/renderer/flux/interface';
import { SnippetsAction } from 'src/renderer/component/Snippets/flux/actions';

const initialState = (): ISnippetsState => ({
  snippets: null,
  pagination: null,
  status: ActionStatus.REQUEST,
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

export default reducer;
