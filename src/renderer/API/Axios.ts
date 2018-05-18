import axios, { AxiosPromise } from 'axios';

const EMAILER_API_URL = '*****/api/';

export namespace Axios {

  export function get(apiMethod: string, urlParams: Array<{ [key: string]: string }>): AxiosPromise<any> {
    return axios.get(EMAILER_API_URL + apiMethod, {
      params: {
        ...urlParams,
      }
    });
  }

  export function post(apiMethod: string, body: object): AxiosPromise<any> {
    return axios.post(EMAILER_API_URL + apiMethod, body);
  }
}