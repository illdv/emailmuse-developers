import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import { ILayout } from '../component/Layouts/flux/interface';

function loading(): any {
  return AxiosWrapper.get('/layouts');
}

function remove(idArray: {id: number[]}): any {
  return AxiosWrapper.deleteResponse2('/layouts', idArray);
}

function create(layout: ILayout): any {
  return AxiosWrapper.post(`/layouts`, layout);
}

function edit(layout: ILayout): any {
  return AxiosWrapper.put(`/layouts/${layout.id}`, layout);
}
// {
//   "title": "some",
//   "body": "<html>/text</html>"
// }
export const LayoutAPI = {
  loading,
  remove,
  create,
  edit,
};
