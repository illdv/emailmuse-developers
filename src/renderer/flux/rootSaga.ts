import { fork } from 'redux-saga/effects';

import { createAccountSaga } from 'src/renderer/component/Profile/Authorisation/flux/sagas/CreateAccountSaga';
import { sendCodeOnMailSaga } from 'src/renderer/component/Profile/Authorisation/flux/sagas/SendCodeOnMailSaga';
import { resetPasswordSaga } from 'src/renderer/component/Profile/Authorisation/flux/sagas/ResetPasswordSaga';
import { toastSaga } from 'src/renderer/common/Toast/flux/saga';
import { imageLibraryRootSaga } from 'src/renderer/component/ImageLibrary/store/sagas/imageLibraryRootSaga';
import {
  loginSaga,
  watcherLogout,
  watcherSetToken,
} from 'src/renderer/component/Profile/Authorisation/flux/sagas/LoginSaga';
import { watcherChangePassword, watcherGetProfile, watcherName } from '../component/Profile/Account/flux/saga';
import templates from 'src/renderer/component/Templates/flux/saga';
import { selectMenuItemWatcher } from 'src/renderer/component/Menu/flux/saga';
import { checkCodeSaga } from 'src/renderer/component/Profile/Authorisation/flux/sagas/CheckCodeSaga';
import { watchLoadingSnippets } from 'src/renderer/component/Snippets/flux/saga';

export default function* rootSaga() {
  yield [
    fork(createAccountSaga),
    fork(loginSaga),
    fork(sendCodeOnMailSaga),
    fork(resetPasswordSaga),
    fork(toastSaga),
    fork(imageLibraryRootSaga),
    fork(watcherSetToken),
    fork(watcherChangePassword),
    fork(watcherName),
    fork(selectMenuItemWatcher),
    ...templates.map(fork),
    fork(watcherGetProfile),
    fork(checkCodeSaga),
    fork(watcherLogout),
    fork(watchLoadingSnippets),
  ];
}
