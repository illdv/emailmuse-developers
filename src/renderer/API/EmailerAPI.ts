import { API_ENDPOINT } from 'src/common/api.config';
import axios, { AxiosPromise } from 'axios';
import { IChangePasswordPayload } from 'src/renderer/component/Account/flux/actions';
import { ITemplate } from 'src/renderer/component/Templates/flux/models';

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

  export function editTemplate(template: ITemplate) {
    const { id, ...remainingData } = template;
    return axios.put(`${API_ENDPOINT}/templates/${id}`, remainingData);
  }

  export function createTemplate(template: ITemplate) {
    return axios.post(`${API_ENDPOINT}/templates`, template);
  }

  export function removeTemplate(templateId: string) {
    return axios.delete(`${API_ENDPOINT}/templates`, {
      data: {
        id: [templateId],
      },
    });
  }
}
