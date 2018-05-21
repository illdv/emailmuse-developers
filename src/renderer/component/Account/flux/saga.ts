import Axios from 'axios';
import { call, put, take } from 'redux-saga/effects';
import { AccountSpace } from 'src/renderer/component/Account/flux/actions';
import  * as EmailerAPI  from 'src/renderer/API/EmailerAPI';


function* onChangePassword(data): IterableIterator<any>{
  // axios.post()
  try {
    // yield call(EmailerAPI.Accounts.changePassword, data);
  } catch (e) {
    console.warn(e);
  }
  yield put(AccountSpace.Actions.changePassword.SUCCESS());
}
export function* ChangePasswordSaga(): IterableIterator<any>{
  while(true){
    const data = yield take(AccountSpace.Actions.changePassword.REQUEST().type);
    yield call(onChangePassword,data);
  }
}
