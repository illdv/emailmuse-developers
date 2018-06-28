import axios, { AxiosPromise } from 'axios';

axios.defaults.baseURL = API_URL;

export namespace AxiosWrapper {

  export function get(apiMethod: string, urlParams: { [key: string]: string | number } = {}): AxiosPromise<any> {
    return axios.get(API_URL + apiMethod, {
      params: urlParams,
    });
  }

  export function post(apiMethod: string, body: any = {}): AxiosPromise<any> {
    return axios.post(API_URL + apiMethod,
      body,
    );
  }

  export function put(apiMethod: string, body: any = {}): AxiosPromise<any> {
    return axios.put(API_URL + apiMethod,
      body,
    );
  }

  export function deleteRequest(apiMethod: string, body: any = {}): AxiosPromise<any> {
    return axios.post(API_URL + apiMethod,
      { ...body, _method: 'DELETE'},
    );
  }
}
