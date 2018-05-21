import { Axios } from 'src/renderer/API/Axios';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import { AxiosPromise } from 'axios';
import { ILoginResponse } from 'type/EmailerAPI';

export namespace EmailerAPI {
  export namespace Accounts {

    export function login(request: FluxAccounts.Actions.Login.IRequest): AxiosPromise<ILoginResponse> {
      return Axios.post('/login', request);
    }

    export function createAccount(user: FluxAccounts.Actions.CreateAccount.IRequest) {
      return new Promise(resolve => {
        setTimeout(() => resolve({ user: 'Jon Snow', email: 'JonSnow@gmail.com' }), 2000);
      });
      // return Axios.post('/register', user);
    }
  }
}