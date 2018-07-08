import { createActionCreator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';

const createAsyncAction = createActionCreator('SWIPE');

const selectEmail  = createAsyncAction('SELECT_EMAIL');
const selectLayout = createAsyncAction('SELECT_LAYOUT');
const needInsertBody = createAsyncAction('NEED_INSERT_BODY');

export const SwipeActions: ISwipeActions = {
  selectEmail,
  selectLayout,
  needInsertBody,
};

export interface ISwipeActions {
  selectEmail: IAsyncAction2<{ email: ITemplate }, {}>;
  selectLayout: IAsyncAction2<{ layout: ILayout }, {}>;
  needInsertBody: IAsyncAction2<{ body: string }, {}>;
}
