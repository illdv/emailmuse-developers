import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { IPagination } from 'src/renderer/common/List/interface';
import { ActionStatus, CreateAction } from 'src/renderer/flux/interface';
import { ActionCreatorsMapObject } from 'redux';
import { EmptyActionCreator } from 'redux-act';

export interface IEmailsState {
  status: ActionStatus;
  emails: IEmail[];
  selectedEmail: IEmail;
}

export interface ILoadingTemplatePayload {
  pagination: IPagination;
  templates: IEmail[];
}

// TODO: delete ?
export interface IEmailActions extends ActionCreatorsMapObject {
  // loading?: CreateAction<{ page: number, hidePreloader?: boolean, search?: string }>;
  loading: CreateAction<{s?: string}>;
  remove?: CreateAction<string>;
  save?: CreateAction<{ email: IEmail, saveAndClose: boolean }>;
  create?: CreateAction<IEmail>;
  select?: CreateAction<IEmail>;
  failure?: EmptyActionCreator;
  successfully?: CreateAction<IEmail[]>;
  createSuccess?: CreateAction<IEmail[]>;
  copy?: CreateAction<{ id: string }>;
  selectNewTemplate?: CreateAction<{ parentId: number }>;
  getEmailFromFolder: CreateAction<{ parentId: number }>;
}
