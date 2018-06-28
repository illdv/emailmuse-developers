import { createActionCreator } from 'src/renderer/flux/utils';
import {
  ICreateAccountRequest,
  ILoginRequest,
  IResetPasswordRequest,
} from 'src/renderer/component/Profile/Authorisation/flux/interface';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { AuthStep, IUser } from 'src/renderer/component/Profile/Authorisation/flux/models';

const createAsyncAction = createActionCreator('SWIPE');

const moveInEmail     = createAsyncAction('MOVE_IN_EMAIL');

export const SwipeActions: ISwipeActions = {
  moveInEmail,
};

export interface ISwipeActions {
  moveInEmail: IAsyncAction2<{ id: string }, {}>;
}
