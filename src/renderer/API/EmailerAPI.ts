import axios, { AxiosPromise } from 'axios';
import { IChangePasswordPayload } from 'src/renderer/component/Profile/Account/flux/module';
import { AxiosWrapper, EMAILER_API_URL } from 'src/renderer/API/AxiosWrapper';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';

// TODO: Move in file
export namespace Accounts {
  export function changePassword(data: IChangePasswordPayload): AxiosPromise<IChangePasswordPayload> {
    return axios.put('/profile/change-password', data);
  }

  export function changeName(name: string): AxiosPromise<{ name: string }> {
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
  export function getTemplates(page): any {
    return AxiosWrapper.get(`/templates/`, {page});
  }

  export function editTemplate(template: ITemplate) {
    const { id, ...remainingData } = template;
    return AxiosWrapper.put(`/templates/${id}`, remainingData);
  }

  export function copyTemplate(id: string) {
    return AxiosWrapper.post(`/templates/${id}/copy`);
  }

  export function createTemplate(template: ITemplate) {
    return AxiosWrapper.post(`/templates`, template);
  }

  // TODO: WTF! axios -> AxiosWrapper
  export function removeTemplate(templateId: string) {
    return axios.delete(`${EMAILER_API_URL}/templates`, {
      data: {
        id: [templateId],
      },
    });
  }
}
