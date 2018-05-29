import { AuthStep, IUser } from 'src/renderer/component/Profile/Auth/flux/models';

export interface IProfileState {
  auth: {
    user: IUser;
    checkCodeSuccess: boolean;
    authStep: AuthStep;
    error: string;
  };
}
