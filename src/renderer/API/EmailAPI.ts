import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';

function get(page: number, search: string = ''): any {
  return AxiosWrapper.get(`/emails/`, { page, s: search });
}

function edit(template: ITemplate) {
  const { id, ...remainingData } = template;
  return AxiosWrapper.put(`/emails/${id}`, remainingData);
}

function copy(id: string) {
  return AxiosWrapper.post(`/emails/${id}/copy`);
}

function create(template: ITemplate[]) {
  return AxiosWrapper.post(`/emails`, { emails: template });
}

function remove(templateId: string) {
  return AxiosWrapper.deleteResponse2(`/emails`,
    { id: [templateId] },
  );
}

export const EmailAPI = {
  get,
  edit,
  copy,
  create,
  remove,
};
