import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import { ILoadingResponse, ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { AxiosPromise } from 'axios';

function loadingSnippets(): AxiosPromise<ILoadingResponse> {
  return AxiosWrapper.get(`/snippets`);
}

function updateSnippets(snippets: ISnippet) {
  return AxiosWrapper.post(`/snippets`, { snippets });
}

function deleteSnippets(snippets: ISnippet) {
  return AxiosWrapper.deleteRequest('/snippets', { snippets });
}

export const SnippetsAPI = {
  loadingSnippets,
  updateSnippets,
  deleteSnippets,
};
