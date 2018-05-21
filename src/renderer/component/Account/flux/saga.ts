import Axios from 'axios';
import { call, put, take } from 'redux-saga/effects';
import { AccountSpace, IChangePasswordFields } from 'src/renderer/component/Account/flux/actions';
import  * as EmailerAPI  from 'src/renderer/API/EmailerAPI';
import { IActionPayload } from 'src/renderer/flux/utils';


function* resetPassword(action: IActionPayload<IChangePasswordFields>):IterableIterator<any> {
  const data = action.payload;
  const res = yield call(EmailerAPI.Accounts.changePassword,data);
}
export function* watcherResetPassword(){
  while(true){
    const data  = yield take('CHANGE_PASSWORD_REQUEST');
    yield call(resetPassword,data);
  }
}
