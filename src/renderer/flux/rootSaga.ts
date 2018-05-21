import {fork} from 'redux-saga/effects';

import { menuItem } from 'src/renderer/component/Menu/flux/menuItemSaga';
import { createAccountSaga } from 'src/renderer/component/Auth/flux/CreateAccountSaga';
import { loginSaga } from 'src/renderer/component/Auth/flux/LoginSaga';
import { sendCodeOnMailSaga } from 'src/renderer/component/Auth/flux/SendCodeOnMailSaga';
import { sendCodeSaga } from 'src/renderer/component/Auth/flux/SendCodeSaga';

export  default function* rootSaga () {
  yield [
    fork(createAccountSaga),
    fork(loginSaga),
    fork(menuItem),
    fork(sendCodeOnMailSaga),
    fork(sendCodeSaga),
  ];
}