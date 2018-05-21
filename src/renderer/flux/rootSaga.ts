import {fork} from 'redux-saga/effects';

import { menuItem } from 'src/renderer/component/Menu/flux/menuItemSaga';
import { createAccountSaga } from 'src/renderer/component/Auth/flux/CreateAccountSaga';
import { loginSaga } from 'src/renderer/component/Auth/flux/LoginSaga';
import templates from 'src/renderer/component/Templates/flux/saga';

export  default function* rootSaga () {
  yield [
    fork(createAccountSaga),
    fork(loginSaga),
    fork(menuItem),
    ...templates.map(fork)
  ];
}