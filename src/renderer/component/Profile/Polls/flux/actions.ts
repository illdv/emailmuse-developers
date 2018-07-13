import { createActionCreator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { IPoll } from './interfase';
import { IQuestion } from 'src/renderer/component/Profile/Polls/flux/interfase';

const createAsyncAction = createActionCreator('POLLS');
const savePoll = createAsyncAction('CREATE');
const getPoll = createAsyncAction('GET');
const nextQuestion = createAsyncAction('NEXT_QUESTION');

export interface IPollsActions {
  savePoll: IAsyncAction2<{ answers: string[] }, {}>;
  getPoll: IAsyncAction2<{}, { poll: IPoll }>;
  nextQuestion: IAsyncAction2<{ answer: string }, { question: IQuestion }>;
}

export const PollsActions: IPollsActions = {
  savePoll,
  getPoll,
  nextQuestion,
};
