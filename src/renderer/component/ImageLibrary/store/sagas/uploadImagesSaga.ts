import { call, put, select, take } from 'redux-saga/effects';
import * as constants from 'src/renderer/component/ImageLibrary/store/constants';
import * as actions from 'src/renderer/component/ImageLibrary/store/actions';
import { IActionPayload } from 'src/renderer/flux/utils';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { useOrDefault } from 'src/renderer/utils';
import { getCurrentPageSelector } from 'src/renderer/component/ImageLibrary/store/selectors';
import { uploadImages } from 'src/renderer/API/ImageLibraryAPI';

function* uploadImagesWorker(action: IActionPayload<File[]>): IterableIterator<any> {
  try {
    yield call(uploadImages, action.payload);
    yield put(actions.uploadImagesSuccess());
    const currentPage = yield select(getCurrentPageSelector);
    // Checks for currentPage being correct are implemented in getImagesWorker saga
    yield put(actions.getImagesRequest(currentPage));
    yield put(FluxToast.Actions.showToast('Image saved'));
  } catch (error) {
    const messages = useOrDefault(() => (error.response.data.errors['images.0']['0']), null);
    if (messages) {
      yield put(FluxToast.Actions.showToast(messages, ToastType.Error));
    }
    yield put(actions.uploadImagesFailure());
  }
}

export function* uploadImagesWatcher(): IterableIterator<any> {
  while (true) {
    const action = yield take(constants.UPLOAD_IMAGES_REQUEST);
    yield call(uploadImagesWorker, action);
  }
}
