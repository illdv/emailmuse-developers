import { fork } from 'redux-saga/effects';

import { createAccountSaga } from 'src/renderer/component/Authorization/flux/CreateAccountSaga';
import { sendCodeOnMailSaga } from 'src/renderer/component/Authorization/flux/SendCodeOnMailSaga';
import { resetPasswordSaga } from 'src/renderer/component/Authorization/flux/ResetPasswordSaga';
import { toastSaga } from 'src/renderer/common/Toast/flux/saga';
import { imageLibraryRootSaga } from 'src/renderer/component/ImageLibrary/store/sagas/imageLibraryRootSaga';
import { loginSaga, watcherLogout, watcherSetToken } from 'src/renderer/component/Authorization/flux/LoginSaga';
import { watcherChangePassword, watcherGetProfile } from '../component/Account/flux/saga';
import templates from 'src/renderer/component/Templates/flux/saga';
import { checkCodeSaga } from 'src/renderer/component/Authorization/flux/CheckCodeSaga';
import { selectMenuItemWatcher } from 'src/renderer/component/Menu/flux/saga';

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
    fork(selectMenuItemWatcher),
    ...templates.map(fork),
    fork(watcherGetProfile),
    fork(checkCodeSaga),
    fork(watcherLogout),
  ];
}
