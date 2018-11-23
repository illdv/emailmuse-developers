import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';

export interface ISwipe {
  id: string;
  title: string;
  subjects: IEmail[];
  is_locked: boolean;
}
