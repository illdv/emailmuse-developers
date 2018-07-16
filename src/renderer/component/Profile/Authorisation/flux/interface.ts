export interface ILoginRequest {
  mail: string;
  password: string;
}

export interface ICreateAccountRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface IResetPasswordRequest {
  email: string;
  token: string;
  password: string;
  passwordConfirmation: string;
}

export interface ILoginResponse {
  token: string;
  token_type: string;
  expires_in: number;
  user: {
    email: string;
    id: number;
    name: string;
    passed_poll: boolean;
    has_email: boolean;
    has_snippet: boolean;
  };
}
