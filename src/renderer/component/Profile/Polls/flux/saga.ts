import { all, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Action } from 'redux-act';
import { PollsActions } from './actions';
import { PollsAPI } from 'src/renderer/API/Polls';
import { createSagaHandler } from 'src/renderer/flux/saga/utils';
import { toastError } from 'src/renderer/flux/saga/toast';
import { IQuestion } from 'src/renderer/component/Profile/Polls/flux/interfase';

export function* pollsFlow() {
  yield put(PollsActions.getPoll.REQUEST({}));
  yield take(PollsActions.getPoll.SUCCESS);
  yield put(PollsActions.nextQuestion.REQUEST({}));
  yield put(push('/polls'));
  yield take(PollsActions.savePoll.SUCCESS);
}

const savePoll = createSagaHandler({
  actionCreators: PollsActions.savePoll,
  apiMethod: PollsAPI.savePoll,
  creatorDataForApi: action => action.payload,
  callbackIfSuccess: [],
  callbackIfFailure: () => toastError('Failed poll saved'),
});

const getPoll = createSagaHandler({
  actionCreators: PollsActions.getPoll,
  apiMethod: PollsAPI.getPoll,
  responseHandler: response => ({
    poll: response.data,
  }),
});

function* nextQuestion(action?: Action<{ answer: string }>) {
  let answers: string[];
  let questions: IQuestion[];
  let currentQuestionId: number;
  let currentQuestion: IQuestion;
  const getQuestions = state => state.polls.poll.questions;
  const getCurrentQuestionId = state => state.polls.currentQuestionId;
  const getAnswers = state => state.polls.answers;

  currentQuestionId = yield select(getCurrentQuestionId);
  questions = yield select(getQuestions);
  answers = yield select(getAnswers);
  currentQuestion = yield questions[currentQuestionId];
  currentQuestionId++;

  if (!action.payload.answer) {
    // initial
    yield put(PollsActions.nextQuestion.SUCCESS({
      currentQuestion,
      currentQuestionId,
      answers,
      done: false,
    }));
  } else {
    // next
    yield put(PollsActions.nextQuestion.SUCCESS({
      currentQuestion,
      done: false,
      currentQuestionId,
      answers: [...answers, ...[action.payload.answer]],
    }));
    if (isPollsCompleted(answers, questions)) {
      // done
      answers = [...answers, ...[action.payload.answer]];
      yield put(PollsActions.nextQuestion.SUCCESS({ currentQuestion: null, done: true, currentQuestionId: null }));
      yield put(PollsActions.savePoll.REQUEST({ answers }));
      localStorage.setItem('EMAILS', '0');
      localStorage.setItem('SNIPPETS', '0');
      localStorage.setItem('LAYOUTS', '0');
      localStorage.setItem('IMAGE_LIBRARY', '0');
      localStorage.setItem('SWIPE', '0');
      localStorage.setItem('TRAINING', '0');
      localStorage.setItem('ACCOUNT', '0');
    }
  }
}

const isPollsCompleted = (answers: string[], questions: IQuestion[]): boolean => {
  const answersCount = answers.length;
  const questionsCount = questions.length - 1;
  return answersCount && (answersCount === questionsCount);
};

function* watcher() {
  yield all([
    takeLatest(PollsActions.getPoll.REQUEST, getPoll),
    takeEvery(PollsActions.savePoll.REQUEST, savePoll),
    takeEvery(PollsActions.nextQuestion.REQUEST, nextQuestion),
  ]);
}

export default [watcher];
