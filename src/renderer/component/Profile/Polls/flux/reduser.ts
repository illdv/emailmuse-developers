import { createReducer } from 'redux-act';
import { IPoll, IQuestion } from 'src/renderer/component/Profile/Polls/flux/interfase';
import { PollsActions } from './actions';

export interface IPollsState {
  poll: IPoll;
  answers: string[];
  currentQuestion: IQuestion;
  currentQuestionId: number;
  done: boolean;
}

const initialState = (): IPollsState => ({
  poll: null,
  answers: [],
  currentQuestion: null,
  currentQuestionId: 0,
  done: false,
});

const reducer = createReducer({}, initialState());

reducer.on(PollsActions.getPoll.SUCCESS, (state, payload) => ({
  ...state,
  ...payload,
}));

reducer.on(PollsActions.nextQuestion.SUCCESS, (state, payload) => ({
  ...state,
  ...payload,
}));
export default reducer;
