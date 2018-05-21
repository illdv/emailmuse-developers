import {fork} from 'redux-saga/effects';
import { menuItem } from 'src/renderer/component/Menu/flux/menuItemSaga';
import { createAccountSaga } from '../component/Accounts/flux/CreateAccountSaga';
import { loginSaga } from 'src/renderer/component/Accounts/flux/LoginSaga';

export  default function* rootSaga() {
  yield [
    fork(createAccountSaga),
    fork(loginSaga),
    fork(menuItem),
  ];
}
