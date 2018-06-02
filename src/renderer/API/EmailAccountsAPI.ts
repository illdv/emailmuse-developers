import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import { AxiosPromise } from 'axios';

export interface IGetGoogleAuthLinkResponse {
  url: string;
}

export function getEmailAccounts() {
  return AxiosWrapper.get('/accounts');
}

export function addNewEmailAccount() {
  return AxiosWrapper.post('/accounts', {});
}

export function deleteEmailAccount(accountId: number) {
  return AxiosWrapper.post(`/accounts/${accountId}`, {});
}

export function getGoogleAuthLink(): AxiosPromise<IGetGoogleAuthLinkResponse> {
  return AxiosWrapper.get('/google/auth');
}

// TODO: number or string?!
export function setGoogleAccessCode(accessCode: number | string) {
  return AxiosWrapper.get(`/google/access?code=${accessCode}`);
}
