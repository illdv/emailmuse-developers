import { createActionCreator } from 'src/renderer/flux/utils';
import {
  ICreateAccountRequest,
  ILoginRequest,
  IResetPasswordRequest,
} from 'src/renderer/component/Profile/Authorisation/flux/interface';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { AuthStep, IUser } from 'src/renderer/component/Profile/Authorisation/flux/models';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';

const createAsyncAction = createActionCreator('SWIPE');

const selectEmail  = createAsyncAction('SELECT_EMAIL');
const selectLayout = createAsyncAction('SELECT_LAYOUT');

export const SwipeActions: ISwipeActions = {
  selectEmail,
  selectLayout,
};

export interface ISwipeActions {
  selectEmail: IAsyncAction2<{ email: ITemplate }, {}>;
  selectLayout: IAsyncAction2<{ layout: ILayout }, {}>;
}
