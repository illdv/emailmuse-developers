import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import { ILayout } from '../component/Layouts/flux/interface';

function loading(): any {
  return AxiosWrapper.get('/layouts');
}

function remove(id: string): any {
  return AxiosWrapper.deleteRequest(`/layouts/${id}`);
}

function create(layout: ILayout): any {
  return AxiosWrapper.post(`/layouts/`, layout);
}

function edit(layout: ILayout): any {
  return AxiosWrapper.post(`/layouts/`, layout);
}

export const LayoutAPI = {
  loading,
  remove,
  create,
};
