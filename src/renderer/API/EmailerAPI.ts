import axios, { AxiosPromise } from 'axios';
import { IChangePasswordPayload } from 'src/renderer/component/Profile/Account/flux/module';

function changePassword(data: IChangePasswordPayload): AxiosPromise<IChangePasswordPayload> {
  return axios.put('/profile/change-password', data);
}

function changeName(name: string): AxiosPromise<{ name: string }> {
  return axios.put('/profile', { name });
}

function getProfile(): AxiosPromise<any> {
  return axios.get('/profile');
}

export const ProfileAPI = {
  getProfile,
  changeName,
  changePassword,
};
