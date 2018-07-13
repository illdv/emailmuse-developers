import { EntityType, IEditEntity } from 'src/renderer/component/Editor/flux/interface';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';

function insertEmailById(selectedLayout: ILayout, selectedEmail: ITemplate): string {
  const main         = htmlTextToNode(selectedLayout.body);
  const contentEmail = main.querySelector('[ids=content-email]');

  while (contentEmail.hasChildNodes()) {
    contentEmail.removeChild(contentEmail.lastChild);
  }
  contentEmail.insertAdjacentHTML('afterbegin', selectedEmail.body);
  return main.innerHTML;
}

function htmlTextToNode(text: string) {
  const layout     = document.createElement('html');
  layout.innerHTML = text;
  return layout;
}

const temporaryLayoutToEntity = ({ id, body, title }: ILayout): IEditEntity => ({
  id,
  html: body,
  idFrontEnd: new Date().getTime().toString(),
  type: EntityType.TemporaryLayout,
  params: {
    title,
  },
});

function isHasIdContentEmail(selectedLayout: ILayout) {
  return htmlTextToNode(selectedLayout.body).querySelector('[ids=content-email]');
}

export const SwipeUtils = {
  insertEmailById,
  isHasIdContentEmail,
  temporaryLayoutToEntity,
};
