export interface ILoginResponse {
  token: string;
  token_type: string;
  expires_in: number;
  user: {
    email: string;
    id: number;
    name: string;
  };
}
