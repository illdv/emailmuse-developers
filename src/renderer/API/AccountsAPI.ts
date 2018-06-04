import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import { AxiosPromise } from 'axios';

export interface IGetGoogleAuthLinkResponse {
  url: string;
}

function getEmailAccounts() {
  return AxiosWrapper.get('/accounts');
}

function addNewEmailAccount() {
  return AxiosWrapper.post('/accounts', {});
}

function deleteEmailAccount(accountId: number) {
  return AxiosWrapper.post(`/accounts/${accountId}`, {});
}

function getGoogleAuthLink(): AxiosPromise<IGetGoogleAuthLinkResponse> {
  return AxiosWrapper.get('/google/auth');
}

function setGoogleAccessCode(code: number | string) {
  return AxiosWrapper.get(`/google/access`, { code });
}

export const AccountsAPI = {
  getEmailAccounts,
  addNewEmailAccount,
  deleteEmailAccount,
  getGoogleAuthLink,
  setGoogleAccessCode,
};
