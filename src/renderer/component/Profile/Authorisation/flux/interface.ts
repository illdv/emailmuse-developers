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
