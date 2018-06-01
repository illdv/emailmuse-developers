import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import { ILoadingResponse, ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { AxiosPromise } from 'axios';

function loadingSnippets(): AxiosPromise<ILoadingResponse> {
  return AxiosWrapper.get(`/snippets`);
}

function addSnippets({body, shortcut, description}: ISnippet) {
  return AxiosWrapper.post(`/snippets`, { body, shortcut, description });
}

function editSnippets(snippets: ISnippet) {
  return AxiosWrapper.put(`/snippets/${snippets.id}`, snippets);
}

function deleteSnippets(imageIds: number[]) {
  return AxiosWrapper.deleteRequest('/snippets', { id: imageIds });
}

export const SnippetsAPI = {
  loadingSnippets,
  addSnippets,
  editSnippets,
  deleteSnippets,
};
