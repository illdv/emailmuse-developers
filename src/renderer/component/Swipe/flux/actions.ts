import { createActionCreator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';

const createAsyncAction = createActionCreator('SWIPE');

const moveSubjectInEmail  = createAsyncAction('MOVE_SUBJECT_IN_EMAIL');
const selectLayout = createAsyncAction('SELECT_LAYOUT');
const moveSwipeInEmail = createAsyncAction('MOVE_SWIPE_IN_EMAIL');

export const SwipeActions: ISwipeActions = {
  moveSubjectInEmail,
  selectLayout,
  moveSwipeInEmail,
};

export interface ISwipeActions {
  moveSubjectInEmail: IAsyncAction2<{ email: ITemplate }, {}>;
  selectLayout: IAsyncAction2<{ layout: ILayout }, {}>;
  moveSwipeInEmail: IAsyncAction2<{ emails: ITemplate[] }, {}>;
}
