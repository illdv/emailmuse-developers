import { createSelector } from 'reselect';
import { IGlobalState } from '../flux/rootReducers';

const getState = (state: IGlobalState) => state;
const SnippetsTotalSelector = (state: IGlobalState) => state.snippets.snippets;
export const statusSelector = (state: IGlobalState) => state.status;
export const FirstTimeSelector = (state: IGlobalState) =>
  state.profile.auth.firstTime;

export const getSnippetsFromState = createSelector(
  getState,
  SnippetsTotalSelector,
);

export const getStatusSelector = createSelector(
  getState,
  statusSelector,
);

export const getFirstTimeSelector = createSelector(
  getState,
  FirstTimeSelector,
);
