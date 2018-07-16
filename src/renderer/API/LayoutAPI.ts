import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import { ILayout } from '../component/Layouts/flux/interface';

function loading(): any {
  return AxiosWrapper.get('/layouts');
}

function remove({ ids }: { ids: number[] }): any {
  return AxiosWrapper.deleteResponse2('/layouts', { id: ids });
}

function create(layout: ILayout): any {
  return AxiosWrapper.post(`/layouts`, layout);
}

function edit(layout: ILayout): any {
  return AxiosWrapper.put(`/layouts/${layout.id}`, layout);
}

export const LayoutAPI = {
  loading,
  remove,
  create,
  edit,
};
