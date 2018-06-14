import * as constants from './constants';
import { createAction } from 'redux-actions';
import { IGetImagesResponse } from 'src/renderer/component/ImageLibrary/store/models';
import * as Status from 'src/renderer/common/PreloaderLayout/Status/constants';

export const getImagesRequest = (page = 1, name: string = '') => ({
  type: constants.GET_IMAGES_REQUEST,
  payload: { page, name},
  meta: { status: Status.LOADING },
});

export const getImagesSuccess = (response: IGetImagesResponse) => ({
  type: constants.GET_IMAGES_SUCCESS,
  payload: response,
  meta: { status: Status.LOADED },
});

export const getImagesFailure = createAction(constants.GET_IMAGES_FAILURE, null, () => ({ status: Status.FAILED }));

export const uploadImagesRequest = (files: File | File[]) => ({
  type: constants.UPLOAD_IMAGES_REQUEST,
  payload: [].concat(files),
  meta: { status: Status.LOADING },
});

export const uploadImagesSuccess =
  createAction(constants.UPLOAD_IMAGES_SUCCESS, null, () => ({ status: Status.LOADED }));

export const uploadImagesFailure =
  createAction(constants.UPLOAD_IMAGES_FAILURE, null, () => ({ status: Status.FAILED }));

export const updateImageRequest = (payload: { imageId: number, name: string }) => ({
  type: constants.UPDATE_IMAGE_REQUEST,
  payload,
  meta: { status: Status.LOADING },
});

export const updateImageSuccess =
  createAction(constants.UPDATE_IMAGE_SUCCESS, null, () => ({ status: Status.LOADED }));

export const updateImageFailure =
  createAction(constants.UPDATE_IMAGE_FAILURE, null, () => ({ status: Status.FAILED }));

export const deleteImagesRequest = (ids: number | number[]) => ({
  type: constants.DELETE_IMAGES_REQUEST,
  payload: [].concat(ids),
  meta: { status: Status.LOADING },
});

export const deleteImagesSuccess =
  createAction(constants.DELETE_IMAGES_SUCCESS, null, () => ({ status: Status.LOADED }));

export const deleteImagesFailure =
  createAction(constants.DELETE_IMAGES_FAILURE, null, () => ({ status: Status.FAILED }));
