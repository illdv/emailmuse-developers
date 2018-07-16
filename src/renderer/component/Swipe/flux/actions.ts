import { createActionCreator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { ISwipe } from 'src/renderer/component/Swipe/flux/interface';

const createAsyncAction = createActionCreator('SWIPE');

const loading = createAsyncAction('LOADING');

const moveSubjectInEmail = createAsyncAction('MOVE_SUBJECT_IN_EMAIL');
const selectLayout       = createAsyncAction('SELECT_LAYOUT');
const moveSwipeInEmail   = createAsyncAction('MOVE_SWIPE_IN_EMAIL');

const selectSwipe   = createAsyncAction('SELECT_SWIPE');
const selectSubject = createAsyncAction('SELECT_SUBJECT');
const resetSelected = createAsyncAction('RESET_SELECTED');

export const SwipeActions: ISwipeActions = {
  loading,
  moveSubjectInEmail,
  selectLayout,
  moveSwipeInEmail,
  selectSwipe,
  selectSubject,
  resetSelected,
};

export interface ISwipeActions {
  loading: IAsyncAction2<{}, { swipes: ISwipe[] }>;

  moveSubjectInEmail: IAsyncAction2<{ email: ITemplate }, {}>;
  selectLayout: IAsyncAction2<{ layout: ILayout }, {}>;
  moveSwipeInEmail: IAsyncAction2<{ emails: ITemplate[] }, {}>;

  selectSwipe: IAsyncAction2<{ selectedSwipe: ISwipe }, {}>;
  selectSubject: IAsyncAction2<{ selectedSubject: ITemplate }, {}>;
  resetSelected: IAsyncAction2<{}, {}>;
}
