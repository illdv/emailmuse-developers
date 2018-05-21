import {fork} from 'redux-saga/effects';

import { menuItem } from 'src/renderer/component/Menu/flux/menuItemSaga';
import { createAccountSaga } from 'src/renderer/component/Auth/flux/CreateAccountSaga';
import { imageLibraryRootSaga } from 'src/renderer/component/ImageLibrary/store/sagas/imageLibraryRootSaga';
import { loginSaga, watcherSetToken } from 'src/renderer/component/Auth/flux/LoginSaga';
import { watcherGetProfile, watcherResetPassword } from '../component/Account/flux/saga';
import { watcherResetPassword } from '../component/Account/flux/saga';
import templates from 'src/renderer/component/Templates/flux/saga';

export  default function* rootSaga () {
  yield [
    fork(createAccountSaga),
    fork(loginSaga),
    fork(menuItem),
    fork(imageLibraryRootSaga),
    fork(watcherSetToken),
    fork(watcherResetPassword),
    ...templates.map(fork),
    fork(watcherGetProfile)
  ];
}