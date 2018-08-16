import { createReducer } from 'redux-act';

import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { ActionStatus } from 'src/renderer/flux/interface';
import { emailActions } from 'src/renderer/component/Emails/flux/action';
import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';

export interface IEmailsState {
  status: ActionStatus;
  emails: IEmail[];
  selectedEmail: IEmail;
}

const initialState: IEmailsState = {
  emails: [],
  selectedEmail: null,
  status: ActionStatus.REQUEST,
};

const reducer = createReducer({}, initialState);

reducer.on(emailActions.save.REQUEST, state => ({
  ...state,
  lastCreatedId: null,
}));

reducer.on(emailActions.successfully.REQUEST, (state, payload): IEmailsState => ({
  ...state,
  emails: payload.emails,
  status: ActionStatus.SUCCESS,
}));

reducer.on(emailActions.failure.REQUEST, (state): IEmailsState => ({
  ...state,
  status: ActionStatus.FAILURE,
}));

reducer.on(emailActions.remove.REQUEST, (state, payload) => ({
  ...state,
  emails: state.emails.filter(email => email.id !== payload.id),
  selectedTemplate: null,
  status: ActionStatus.REQUEST,
}));

reducer.on(emailActions.createSuccess.REQUEST, (state, payload) => ({
  ...state,
  status: ActionStatus.SUCCESS,
}));

reducer.on(DrawerMenuAction.selectMenuItem, state => ({
  ...state,
  selectedTemplate: null,
}));

export default reducer;
