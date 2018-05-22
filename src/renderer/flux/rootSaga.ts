import {fork} from 'redux-saga/effects';

import { menuItem } from 'src/renderer/component/Menu/flux/menuItemSaga';
import { createAccountSaga } from 'src/renderer/component/Auth/flux/CreateAccountSaga';
import { sendCodeOnMailSaga } from 'src/renderer/component/Auth/flux/SendCodeOnMailSaga';
import { resetPasswordSaga } from 'src/renderer/component/Auth/flux/ResetPasswordSaga';
import { toastSaga } from 'src/renderer/component/Toast/flux/saga';
import { imageLibraryRootSaga } from 'src/renderer/component/ImageLibrary/store/sagas/imageLibraryRootSaga';
import { loginSaga, watcherSetToken } from 'src/renderer/component/Auth/flux/LoginSaga';
import { watcherGetProfile, watcherChangePassword } from '../component/Account/flux/saga';
import templates from 'src/renderer/component/Templates/flux/saga';

export  default function* rootSaga () {
  yield [
    fork(createAccountSaga),
    fork(loginSaga),
    fork(menuItem),
    fork(sendCodeOnMailSaga),
    fork(resetPasswordSaga),
    fork(toastSaga),
    fork(imageLibraryRootSaga),
    fork(watcherSetToken),
    fork(watcherChangePassword),
    ...templates.map(fork),
    fork(watcherGetProfile)
  ];
}