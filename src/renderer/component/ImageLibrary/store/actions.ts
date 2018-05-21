import * as actions from './constants';
import { createAction } from 'redux-actions';

export const getImagesRequest = () => ({
  type: actions.GET_IMAGES_REQUEST,
  payload: null
});

export const getImagesSuccess = () => createAction(actions.GET_IMAGES_SUCCESS);

export const getImagesFailure = () => createAction(actions.GET_IMAGES_SUCCESS);

export const uploadImagesRequest = (payload: { files: File | File[] }) => ({
  type: actions.UPLOAD_IMAGES_REQUEST,
  payload: [].concat(payload.files)
});

export const uploadImagesSuccess = () => createAction(actions.UPLOAD_IMAGES_FAILURE);

export const uploadImagesFailure = () => createAction(actions.UPLOAD_IMAGES_FAILURE);

export const updateImageRequest = (payload: { imageId: number, name: string }) => ({
  type: actions.UPDATE_IMAGE_REQUEST,
  payload
});

export const updateImageSuccess = () => createAction(actions.UPDATE_IMAGE_SUCCESS);

export const updateImageFailure = () => createAction(actions.UPDATE_IMAGE_FAILURE);

export const deleteImagesRequest = (payload: { ids: number | number[] }) => ({
  type: actions.DELETE_IMAGES_REQUEST,
  payload: [].concat(payload.ids)
});

export const deleteImagesSuccess = createAction(actions.DELETE_IMAGES_SUCCESS);

export const deleteImagesFailure = createAction(actions.DELETE_IMAGES_SUCCESS);
