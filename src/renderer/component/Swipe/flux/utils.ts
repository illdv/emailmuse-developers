import { EntityType, IEditEntity } from 'src/renderer/component/Editor/flux/interface';
import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';

const temporaryLayoutToEntity = ({ id, body, title }: ILayout): IEditEntity => ({
  id,
  folderId: null, // set root folder
  html: body,
  idFrontEnd: new Date().getTime().toString(),
  type: EntityType.TemporaryLayout,
  params: {
    title,
  },
});

export const SwipeUtils = {
  temporaryLayoutToEntity,
};
