import { createActionCreator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { IPoll } from './interfase';

const createAsyncAction = createActionCreator('POLLS');
const savePoll = createAsyncAction('CREATE');
const getPoll = createAsyncAction('GET');

export interface IPollsActions {
  savePoll: IAsyncAction2<{}, {}>;
  getPoll: IAsyncAction2<{}, { poll: IPoll }>;
}

export const PollsActions: IPollsActions = {
  savePoll,
  getPoll,
};
