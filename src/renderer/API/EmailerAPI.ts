import { API_ENDPOINT } from 'src/common/api.config';
import axios from 'axios';
import { AxiosPromise } from 'axios';
import { IChangePasswordPayload } from 'src/renderer/component/Account/flux/actions';
import {
  IDataForDeleteTemplates,
  IDataForCreateTemplate,
  IDataForEditTemplate
} from 'src/renderer/component/Templates/models';

export namespace Accounts {
  export function changePassword(data: IChangePasswordPayload): AxiosPromise<IChangePasswordPayload> {
    return axios.put('/profile/change-password',data);
  }
  export function changeName({name:sting}): AxiosPromise<{name:string}> {
    return axios.put('/profile', {
      name
    });
  }
  export function getProfile(): AxiosPromise<any> {
    return axios.get('/profile');
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

    export function getImages(pageId:number = 1) {
      return axios.get(`${API_ENDPOINT}/images/?page=${pageId}`);
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

  export namespace Templates{
    export function getTemplates(){
      return axios.get(`${API_ENDPOINT}/templates`);
    }

    export function editTemplate(data: IDataForEditTemplate){
      const {id, ...remainingData} = data;
      return axios.put(`${API_ENDPOINT}/templates/${id}`, remainingData);
    }

    export function createTemplate(data: IDataForCreateTemplate){
      return axios.post(`${API_ENDPOINT}/templates`, data);
    }

    export function removeTempates(data: IDataForDeleteTemplates){
        return axios.delete(`${API_ENDPOINT}/templates`, { data });
    }
  }
  /* export default ImageLibrary; */