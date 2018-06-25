import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import { ILayout } from '../component/Layouts/flux/interface';

function loading(): any {
  return AxiosWrapper.get('/layout');
}

function remove(id: string): any {
  return AxiosWrapper.deleteRequest(`/layout/${id}`);
}

function create(layout: ILayout): any {
  return AxiosWrapper.post(`/layout/`, layout);
}

function edit(layout: ILayout): any {
  return AxiosWrapper.post(`/layout/`, layout);
}

export const LayoutAPI = {
  loading,
  remove,
  create,
};
