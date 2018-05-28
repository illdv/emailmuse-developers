import { getImagesWatcher } from 'src/renderer/component/ImageLibrary/store/sagas/getImagesSaga';
import { uploadImagesWatcher } from 'src/renderer/component/ImageLibrary/store/sagas/uploadImagesSaga';
import { fork } from 'redux-saga/effects';
import { updateImageWatcher } from 'src/renderer/component/ImageLibrary/store/sagas/updateImageSaga';
import { deleteImagesWatcher } from 'src/renderer/component/ImageLibrary/store/sagas/deleteImagesSaga';

export function* imageLibraryRootSaga() {
  yield [
    fork(getImagesWatcher),
    fork(uploadImagesWatcher),
    fork(updateImageWatcher),
    fork(deleteImagesWatcher),
  ];
}
