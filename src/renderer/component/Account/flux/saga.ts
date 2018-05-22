import Axios from 'axios';
import { call, put, take } from 'redux-saga/effects';
import { AccountSpace, IChangePasswordPayload } from 'src/renderer/component/Account/flux/actions';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';
import { IActionPayload } from 'src/renderer/flux/utils';
import { FluxToast, ToastType } from 'src/renderer/component/Toast/flux/actions';

function* getProfileSaga() {
  try {
    const res = yield call(EmailerAPI.Accounts.getProfile);
    yield put(AccountSpace.Actions.getProfile.SUCCESS({
      name: res.data.name,
      email: res.data.email
    }));
  } catch (e) {
    console.error(e);
  }
 
  
}
function* resetPasswordSaga(action: IActionPayload<IChangePasswordPayload>):IterableIterator<any> {
  try {
    const data = action.payload;
    const res  = yield call(EmailerAPI.Accounts.changePassword, data);
    yield put(FluxToast.Actions.showToast('Reset password success', ToastType.Success));
  } catch (e) {
    yield put(FluxToast.Actions.showToast('Failed reset password', ToastType.Error));
  }
}
export function* watcherGetProfile(){
  while(true){
    yield take('GET_PROFILE_REQUEST');
    yield call(getProfileSaga);
  }
}
export function* watcherResetPassword(){
  while(true){
    const data  = yield take('CHANGE_PASSWORD_REQUEST');
    yield call(resetPasswordSaga,data);
  }
}
