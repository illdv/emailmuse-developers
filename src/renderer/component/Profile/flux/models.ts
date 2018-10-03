import { AuthStep, IUser } from 'src/renderer/component/Profile/Authorisation/flux/models';

export interface IProfileState {
  auth: {
    user: IUser;
    checkCodeSuccess: boolean;
    authStep: AuthStep;
    error: string;
    password?: string;
  };
}
