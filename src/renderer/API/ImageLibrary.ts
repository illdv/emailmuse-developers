import { API_ENDPOINT } from 'src/renderer/API/api.config';
import axios from 'axios';

export function uploadImages(files: File | File[]);

export function uploadImages(files) {
  const fd = new FormData();
  for (let i = 0; i < files.length; i++) {
    fd.append(`images[${i}]`, files[i]);
  }
  return axios.post(`${API_ENDPOINT}/images`, fd);
}

export function getImages(pageId: number = 1) {
  return axios.get(`${API_ENDPOINT}/images/?page=${pageId}`);
}

export function updateImage(imageId: number, name: string) {
  return axios.put(`${API_ENDPOINT}/images/${imageId}`, { name });
}

// TODO change type
export function deleteImages(imageIds: number | number[]) {
  return axios.post(`${API_ENDPOINT}/images`, { id: imageIds, _method: 'DELETE' });
}
