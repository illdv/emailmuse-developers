import { Axios } from 'src/renderer/API/Axios';

export namespace EmailerAPI {
  export namespace Accounts {
    function login(username: string, password: string) {
      return Axios.post('/login', { username, password });
    }
  }
}