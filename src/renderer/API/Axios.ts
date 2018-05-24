import axios, { AxiosPromise } from 'axios';

const EMAILER_API_URL  = 'http://dev.emailer-electron-laravel.cronix.ms/api/v1';
axios.defaults.baseURL = EMAILER_API_URL;

export namespace Axios {

  // TODO: Fix bug, urlParams not work.
  export function get(apiMethod: string, urlParams: Array<{ [key: string]: string }>): AxiosPromise<any> {
    return axios.get(EMAILER_API_URL + apiMethod, {
      params: { ...urlParams },
    });
  }

  export function post(apiMethod: string, body: any): AxiosPromise<any> {
    return axios.post(EMAILER_API_URL + apiMethod,
      body,
    );
  }
}
