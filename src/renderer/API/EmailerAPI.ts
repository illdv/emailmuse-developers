import { Axios } from 'src/renderer/API/Axios';
import { FluxAccounts } from 'src/renderer/component/Accounts/flux/FluxAccounts';

export namespace EmailerAPI {
  export namespace Accounts {
    export function login(username: string, password: string) {
      return Axios.post('/login', { username, password });
    }

    export function createAccount(user: FluxAccounts.Actions.CreateAccount.IRequest) {
      return new Promise(resolve => {
        setTimeout(() => resolve({user: 'Jon Snow', email: 'JonSnow@gmail.com'}), 3000);
      });
     // return Axios.post('/register', user);
    }
  }
}