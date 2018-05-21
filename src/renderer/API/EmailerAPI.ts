import { Axios } from 'src/renderer/API/Axios';
import { API_ENDPOINT } from 'src/common/api.config';
import { authToken } from 'src/common/hardcoded_token';
import axios from 'axios';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import { AxiosPromise } from 'axios';
import { ILoginResponse } from 'type/EmailerAPI';

export namespace Accounts {
  export function login(request: FluxAccounts.Actions.Login.IRequest): AxiosPromise<ILoginResponse> {
    return Axios.post('/login', request);
  }

  export function createAccount(user: FluxAccounts.Actions.CreateAccount.IRequest) {
    return Axios.post('/register', user);
  }

  export function sendCodeOnMail(email: string) {
    return Axios.post('/password/email', { email });
  }

  export function changePassword(data: IChangePasswordPayload): AxiosPromise<IChangePasswordPayload> {
    return axios.put('/profile/change-password',data);
  }
  export function getProfile(): AxiosPromise<any> {
    return axios.get('/profile');
  }

  export function resetPassword({email, token, password, passwordConfirmation}: {email: string, token: string, password: string, passwordConfirmation: string }) {
    return Axios.post('/password/reset', { email, token, password, password_confirmation: passwordConfirmation });
  }
}

  export namespace ImageLibrary {
    // TODO change type
    export function uploadImages(
      files: File | File[],
      onProgress?: (percent: number) => void
    );

    export function uploadImages(files, onProgress = _ => void 0) {
      // If files is a single file (not an array) - wrap it into an array
      // files = [].concat(files);

      const fd = new FormData();
      for (let i=0; i<files.length; i++) {
        fd.append(`images[${i}]`, files[i]);
      }
      return axios.post(`${API_ENDPOINT}/images`, fd, {
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
      return axios.get(`${API_ENDPOINT}/images`);
    }

    export function updateImage(imageId: number, name: string) {
      return axios.put(`${API_ENDPOINT}/images/${imageId}`, { name });
    }

    // TODO change type
    export function deleteImages(imageIds: number | number[]) {
      // If imageIds is a single file (not an array) - wrap it into an array
      // imageIds = [].concat(imageIds);

      return axios.post(`${API_ENDPOINT}/images`, { id: imageIds, _method: 'DELETE' });
    }
  }
  /* export default ImageLibrary; */