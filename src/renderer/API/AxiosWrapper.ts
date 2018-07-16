import axios, { AxiosPromise } from 'axios';

axios.defaults.baseURL = API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

function get(apiMethod: string, urlParams: { [key: string]: string | number } = {}): AxiosPromise<any> {
  return instance.get(apiMethod, { params: urlParams });
}

function post(apiMethod: string, body: any = {}): AxiosPromise<any> {
  return instance.post(apiMethod, body );
}

function put(apiMethod: string, body: any = {}): AxiosPromise<any> {
  return instance.put(apiMethod, body);
}

/**
 * @deprecated use deleteResponse2
 * @param {string} apiMethod
 * @param body
 * @returns {AxiosPromise<any>}
 */
function deleteRequest(apiMethod: string, body: any = {}): AxiosPromise<any> {
  return instance.post(apiMethod,
    { ...body, _method: 'DELETE' },
  );
}

function deleteResponse2(apiMethod: string, body: any): AxiosPromise<any> {
  return instance.delete(apiMethod, { data: body });
}

export const AxiosWrapper = {
  get,
  post,
  put,
  deleteRequest,
  deleteResponse2,
};
