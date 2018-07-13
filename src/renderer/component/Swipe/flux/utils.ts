import { EntityType, IEditEntity } from 'src/renderer/component/Editor/flux/interface';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';

const temporaryLayoutToEntity = ({ id, body, title }: ILayout): IEditEntity => ({
  id,
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
