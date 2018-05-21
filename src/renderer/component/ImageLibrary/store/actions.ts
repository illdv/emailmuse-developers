import * as constants from './constants';
import { createAction } from 'redux-actions';
import { IFileInfo } from 'src/renderer/component/ImageLibrary/store/models';

export const getImagesRequest = () => ({
  type: constants.GET_IMAGES_REQUEST,
  payload: null
});

export const getImagesSuccess = (images: IFileInfo[]) => ({
  type: constants.GET_IMAGES_SUCCESS,
  payload: null
});

export const getImagesFailure = () => createAction(constants.GET_IMAGES_SUCCESS);

export const uploadImagesRequest = (payload: { files: File | File[] }) => ({
  type: constants.UPLOAD_IMAGES_REQUEST,
  payload: [].concat(payload.files)
});

export const uploadImagesSuccess = () => createAction(constants.UPLOAD_IMAGES_FAILURE);

export const uploadImagesFailure = () => createAction(constants.UPLOAD_IMAGES_FAILURE);

export const updateImageRequest = (payload: { imageId: number, name: string }) => ({
  type: constants.UPDATE_IMAGE_REQUEST,
  payload
});

export const updateImageSuccess = () => createAction(constants.UPDATE_IMAGE_SUCCESS);

export const updateImageFailure = () => createAction(constants.UPDATE_IMAGE_FAILURE);

export const deleteImagesRequest = (payload: { ids: number | number[] }) => ({
  type: constants.DELETE_IMAGES_REQUEST,
  payload: [].concat(payload.ids)
});

export const deleteImagesSuccess = createAction(constants.DELETE_IMAGES_SUCCESS);

export const deleteImagesFailure = createAction(constants.DELETE_IMAGES_SUCCESS);
