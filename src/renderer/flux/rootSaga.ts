import { fork } from 'redux-saga/effects';

import { createAccountSaga } from 'src/renderer/component/Profile/Authorisation/flux/sagas/CreateAccountSaga';
import { sendCodeOnMailSaga } from 'src/renderer/component/Profile/Authorisation/flux/sagas/SendCodeOnMailSaga';
import { resetPasswordSaga } from 'src/renderer/component/Profile/Authorisation/flux/sagas/ResetPasswordSaga';
import { toastSaga } from 'src/renderer/common/Toast/flux/saga';
import { imageLibraryRootSaga } from 'src/renderer/component/ImageLibrary/store/sagas/imageLibraryRootSaga';
import { watcherChangePassword, watcherGetProfile, watcherName } from '../component/Profile/Account/flux/saga';
import { checkCodeSaga } from 'src/renderer/component/Profile/Authorisation/flux/sagas/CheckCodeSaga';
import { menuWatcher } from 'src/renderer/component/Menu/flux/saga';

import login from 'src/renderer/component/Profile/Authorisation/flux/sagas/LoginSaga';
import templates from 'src/renderer/component/Templates/flux/saga';
import snippets from 'src/renderer/component/Snippets/flux/saga';
import layouts from 'src/renderer/component/Layouts/flux/saga';
import swipe from 'src/renderer/component/Swipe/flux/saga';

export default function* rootSaga() {
  yield [
    fork(createAccountSaga),
    fork(sendCodeOnMailSaga),
    fork(resetPasswordSaga),
    fork(toastSaga),
    fork(imageLibraryRootSaga),
    fork(watcherChangePassword),
    fork(watcherName),
    fork(watcherGetProfile),
    fork(checkCodeSaga),
    ...login.map(fork),
    ...templates.map(fork),
    ...snippets.map(fork),
    ...layouts.map(fork),
    ...swipe.map(fork),
    menuWatcher,
  ];
}
