import { fork } from 'redux-saga/effects';

import { menuItem } from 'src/renderer/component/Menu/flux/menuItemSaga';
import { createAccountSaga } from 'src/renderer/component/Profile/Auth/flux/sagas/CreateAccountSaga';
import { sendCodeOnMailSaga } from 'src/renderer/component/Profile/Auth/flux/sagas/SendCodeOnMailSaga';
import { resetPasswordSaga } from 'src/renderer/component/Profile/Auth/flux/sagas/ResetPasswordSaga';
import { toastSaga } from 'src/renderer/common/Toast/flux/saga';
import { imageLibraryRootSaga } from 'src/renderer/component/ImageLibrary/store/sagas/imageLibraryRootSaga';
import { loginSaga, watcherLogout, watcherSetToken } from 'src/renderer/component/Profile/Auth/flux/sagas/LoginSaga';
import { watcherChangePassword, watcherGetProfile } from '../component/Account/flux/saga';
import templates from 'src/renderer/component/Templates/flux/saga';
import { checkCodeSaga } from 'src/renderer/component/Profile/Auth/flux/sagas/CheckCodeSaga';

export default function* rootSaga() {
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
    fork(watcherGetProfile),
    fork(checkCodeSaga),
    fork(watcherLogout),
  ];
}
