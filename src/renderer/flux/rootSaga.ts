import {fork} from 'redux-saga/effects';
import { menuItem } from 'src/renderer/component/Menu/flux/menuItemSaga';
import { createAccountSaga } from 'src/renderer/component/Accounts/flux/AccountsSaga';

export  default function* rootSaga () {
  yield [
    fork(createAccountSaga),
    fork(menuItem),
  ];
}