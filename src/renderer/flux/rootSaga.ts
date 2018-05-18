import {fork} from 'redux-saga/effects';
import {loginSaga} from '../component/Accounts/flux/saga';
import { loadingMailSaga } from 'src/renderer/component/MailList/flux/saga/LoadingMailSaga';
import { sendMailSaga } from 'src/renderer/component/MailList/flux/saga/SendMailSaga';
import { menuItem } from 'src/renderer/component/Menu/flux/menuItemSaga';

export  default function* rootSaga () {
  yield [
    fork(loginSaga),
    fork(loadingMailSaga),
    fork(sendMailSaga),
    fork(menuItem),
  ];
}