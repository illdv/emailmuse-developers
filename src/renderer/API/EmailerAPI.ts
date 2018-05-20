import { Axios } from 'src/renderer/API/Axios';
import { FluxAccounts } from 'src/renderer/component/Accounts/flux/FluxAccounts';
import { AxiosPromise } from 'axios';
import { API_ENDPOINT } from 'src/common/api.config';
import { authToken } from 'src/common/hardcoded_token';
import { ILoginResponse } from 'type/EmailerAPI';
import axios from 'axios';

export namespace EmailerAPI {
  export namespace Accounts {

    export function login(request: FluxAccounts.Actions.Login.IRequest): AxiosPromise<ILoginResponse> {
      return Axios.post('/login', request);
    }

    export function createAccount(user: FluxAccounts.Actions.CreateAccount.IRequest) {
      return new Promise(resolve => {
        setTimeout(() => resolve({ user: 'Jon Snow', email: 'JonSnow@gmail.com' }), 2000);
      });
      // return Axios.post('/register', user);
    }
  }
}

// TODO-DmitryUskov please rewrite with use Axios wrapper. And yes wrapper need.
export namespace ImageLibrary {
  export function uploadImages(
    files: File | File[],
    onProgress?: (percent: number) => void
  );

  export function uploadImages(files, onProgress = _ => void 0) {
    // If files is a single file (not an array) - wrap it into an array
    files = [].concat(files);

    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append(`images[${i}]`, files[i]);
    }
    return axios.post(`${API_ENDPOINT}/images`, fd, {
      // TODO: remove hardcoded authToken
      headers: { Authorization: authToken },
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader('content-length')
          || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        if (totalLength !== null) {
          onProgress(Math.round((progressEvent.loaded * 100) / totalLength));
        }
      }
    });
  }

  export function getImages() {
    return axios.get(`${API_ENDPOINT}/images`, {
      // TODO: remove hardcoded authToken
      headers: { Authorization: authToken }
    });
  }

  export function updateImage(imageId: number, name: string) {
    return axios.put(`${API_ENDPOINT}/images/${imageId}`, { name }, {
      // TODO: remove hardcoded authToken
      headers: { Authorization: authToken }
    });
  }

  export function deleteImages(imageIds: number | number[]) {
    // If imageIds is a single file (not an array) - wrap it into an array
    imageIds = [].concat(imageIds);

    return axios.post(`${API_ENDPOINT}/images`, { id: imageIds, _method: 'DELETE' }, {
      // TODO: remove hardcoded authToken
      headers: { Authorization: authToken }
    });
  }
}

// TODO-DmitryUskov I think it's not need because use 'export namespace'
export default { ImageLibrary };