import axios, { AxiosPromise } from 'axios';

export const EMAILER_API_URL  = 'http://dev.emailer-electron-laravel.cronix.ms/api/v1';
axios.defaults.baseURL = EMAILER_API_URL;

export namespace AxiosWrapper {

  export function get(apiMethod: string, urlParams: { [key: string]: string | number } = {}): AxiosPromise<any> {
    return axios.get(EMAILER_API_URL + apiMethod, {
      params: urlParams,
    });
  }

  export function post(apiMethod: string, body: any = {}): AxiosPromise<any> {
    return axios.post(EMAILER_API_URL + apiMethod,
      body,
    );
  }

  export function put(apiMethod: string, body: any = {}): AxiosPromise<any> {
    return axios.put(EMAILER_API_URL + apiMethod, body);
  }

  /**
   * @deprecated use deleteResponse2
   * @param {string} apiMethod
   * @param body
   * @returns {AxiosPromise<any>}
   */
  export function deleteRequest(apiMethod: string, body: any = {}): AxiosPromise<any> {
    return axios.post(EMAILER_API_URL + apiMethod,
      { ...body, _method: 'DELETE'},
    );
  }

  export function deleteResponse2(apiMethod: string, body: any ): AxiosPromise<any> {
    return axios.delete(EMAILER_API_URL + apiMethod, { data: body });
  }
}
