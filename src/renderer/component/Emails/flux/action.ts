import { createActionCreator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';

const createAsyncAction = createActionCreator('EMAILS');
const loading = createAsyncAction('LOADING');
const remove = createAsyncAction('REMOVE');
const save = createAsyncAction('SAVE');
const create = createAsyncAction('CREATE');
const select = createAsyncAction('SELECT');
const failure = createAsyncAction('FAILURE');
const successfully = createAsyncAction('SELECT_SUBJECT');
const createSuccess = createAsyncAction('CREATE_SUCCESS');
const copy = createAsyncAction('COPY');
const selectNewTemplate = createAsyncAction('SELECT_NEW_TEMPLATE');
const getEmailFromFolder = createAsyncAction('GET_FROM_FOLDER');

export interface IEmailsActions {
  loading: IAsyncAction2<{ s?: string }>;
  remove?: IAsyncAction2<{ id: number }>;
  save?: IAsyncAction2<{ email: IEmail, saveAndClose: boolean }>;
  create?: IAsyncAction2<{ email: IEmail }>;
  select?: IAsyncAction2<{ email: IEmail }>;
  failure?: IAsyncAction2;
  successfully?: IAsyncAction2<{ emails: IEmail[] }, {}>;
  createSuccess?: IAsyncAction2<{ emails: IEmail[] }, {}>;
  copy?: IAsyncAction2<{ id: string }>;
  selectNewTemplate?: IAsyncAction2<{ parentId: number }>;
  getEmailFromFolder: IAsyncAction2<{ parentId: number }, {emails: IEmail[]}>;
}

export const emailActions: IEmailsActions = {
  loading,
  remove,
  save,
  create,
  select,
  failure,
  successfully,
  createSuccess,
  copy,
  selectNewTemplate,
  getEmailFromFolder,
};
