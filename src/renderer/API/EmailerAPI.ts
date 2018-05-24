import { API_ENDPOINT } from 'src/common/api.config';
import axios, { AxiosPromise } from 'axios';
import { IChangePasswordPayload } from 'src/renderer/component/Account/flux/actions';
import {
  IDataForCreateTemplate,
  IDataForDeleteTemplates,
  IDataForEditTemplate,
} from 'src/renderer/component/Templates/models';

// TODO: Move in file
export namespace Accounts {
  export function changePassword(data: IChangePasswordPayload): AxiosPromise<IChangePasswordPayload> {
    return axios.put('/profile/change-password', data);
  }

  export function changeName({ name: sting }): AxiosPromise<{ name: string }> {
    return axios.put('/profile', {
      name,
    });
  }

  export function getProfile(): AxiosPromise<any> {
    return axios.get('/profile');
  }
}

// TODO: Move in file
export namespace Templates {
  export function getTemplates() {
    return axios.get(`${API_ENDPOINT}/templates`);
  }

  export function editTemplate(data: IDataForEditTemplate) {
    const { id, ...remainingData } = data;
    return axios.put(`${API_ENDPOINT}/templates/${id}`, remainingData);
  }

  export function createTemplate(data: IDataForCreateTemplate) {
    return axios.post(`${API_ENDPOINT}/templates`, data);
  }

  export function removeTempates(data: IDataForDeleteTemplates) {
    return axios.delete(`${API_ENDPOINT}/templates`, { data });
  }
}