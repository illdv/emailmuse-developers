import * as constants from './constants';
import { createAction } from 'redux-actions';
import { IFileInfo } from 'src/renderer/component/ImageLibrary/store/models';

export const getImagesRequest = () => ({
  type: constants.GET_IMAGES_REQUEST,
  payload: null,
  meta: { status: 'LOADING' }
});

export const getImagesSuccess = (images: IFileInfo[]) => ({
  type: constants.GET_IMAGES_SUCCESS,
  payload: images,
  meta: { status: 'LOADED' }
});

export const getImagesFailure = createAction(constants.GET_IMAGES_FAILURE, null, { status: 'FAILED' });

export const uploadImagesRequest = (files: File | File[]) => ({
  type: constants.UPLOAD_IMAGES_REQUEST,
  payload: [].concat(files),
  meta: { status: 'LOADING' }
});

export const uploadImagesSuccess = createAction(constants.UPLOAD_IMAGES_SUCCESS, null, { status: 'LOADED' });

export const uploadImagesFailure = createAction(constants.UPLOAD_IMAGES_FAILURE, null, { status: 'FAILED' });

export const updateImageRequest = (payload: { imageId: number, name: string }) => ({
  type: constants.UPDATE_IMAGE_REQUEST,
  payload,
  meta: { status: 'LOADING' }
});

export const updateImageSuccess = createAction(constants.UPDATE_IMAGE_SUCCESS, null, { status: 'LOADED' });

export const updateImageFailure = createAction(constants.UPDATE_IMAGE_FAILURE, null, { status: 'FAILED' });

export const deleteImagesRequest = (ids: number | number[]) => ({
  type: constants.DELETE_IMAGES_REQUEST,
  payload: [].concat(ids),
  meta: { status: 'LOADING' }
});

export const deleteImagesSuccess = createAction(constants.DELETE_IMAGES_SUCCESS, null, { status: 'LOADED' });

export const deleteImagesFailure = createAction(constants.DELETE_IMAGES_FAILURE, null, { status: 'FAILED' });
