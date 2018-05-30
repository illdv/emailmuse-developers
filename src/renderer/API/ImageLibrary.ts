import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';

export function uploadImages(files: File | File[]);

export function uploadImages(files) {
  const fd = new FormData();
  for (let i = 0; i < files.length; i++) {
    fd.append(`images[${i}]`, files[i]);
  }
  return AxiosWrapper.post('/images', fd);
}

export function getImages(pageId: number = 1) {
  return AxiosWrapper.get(`/images/?page=${pageId}`);
}

export function updateImage(imageId: number, name: string) {
  return AxiosWrapper.put(`/images/${imageId}`, { name });
}

export function deleteImages(imageIds: number[]) {
  return AxiosWrapper.deleteRequest('/images', { id: imageIds });
}
