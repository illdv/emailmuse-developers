import { createReducer } from 'redux-act';
import { IPoll } from 'src/renderer/component/Profile/Polls/flux/interfase';
import { PollsActions } from './actions';

export interface IPollsState {
  poll: IPoll;
}

const initialState = (): IPollsState => ({
  poll: null,
});

const reducer = createReducer({}, initialState());

reducer.on(PollsActions.getPoll.SUCCESS, (state, payload) => ({
  ...state,
  ...payload,
}));

export default reducer;
