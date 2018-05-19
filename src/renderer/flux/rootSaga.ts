import {fork} from 'redux-saga/effects';
import {loginSaga} from '../component/Accounts/flux/saga';
import { menuItem } from 'src/renderer/component/Menu/flux/menuItemSaga';

export  default function* rootSaga () {
  yield [
    fork(loginSaga),
    fork(menuItem),
  ];
}