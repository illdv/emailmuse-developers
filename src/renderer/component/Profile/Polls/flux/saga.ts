import { all, call, put, race, take, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Action } from 'redux-act';

import { errorHandler } from 'src/renderer/flux/saga/errorHandler';
import { PollsActions } from './actions';
import { PollsAPI } from 'src/renderer/API/Polls';
import { createSagaHandler } from 'src/renderer/flux/saga/utils';
import { toastError } from 'src/renderer/flux/saga/toast';

const savePoll = createSagaHandler({
  actionCreators: PollsActions.savePoll,
  apiMethod: PollsAPI.savePoll,
  creatorDataForApi: action => action.payload,
  callbackIfSuccess: [
    // Должны получить нового пользователя с допуском потом
    put(push('/')),
  ],
  callbackIfFailure: () => toastError('Server does not available'),
});

const getPoll = createSagaHandler({
  actionCreators: PollsActions.getPoll,
  apiMethod: PollsAPI.getPoll,
  responseHandler: response => ({
    poll: response.data[0],
  }),
  callbackIfSuccess: [
    // Должны получить нового пользователя с допуском
    // call(),
  ],
  callbackIfFailure: null,
});

// function* nextQuestion(answer) {
//   // получили ответ> сохранили > взяли новый вопрос > oтдали
//   const nextquestion: IQuestion;
//   put(PollsActions.nextQuestion.SUCCESS, nextquestion);
// }

function* watcher() {
  yield all([
    takeEvery(PollsActions.getPoll.REQUEST, getPoll),
    takeEvery(PollsActions.savePoll.REQUEST, savePoll),
    // takeEvery(PollsActions.nextQuestion.REQUEST, nextQuestion),
  ]);
}

export default [watcher];
