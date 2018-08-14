import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { IListCardItem } from 'src/renderer/common/List/ListCard/ListCard';
import * as React from 'react';
import { EntityType, IEditEntity } from 'src/renderer/component/Editor/flux/interface';

export function createLayoutEmpty() {
  return {
    title: '',
    body: '',
    description: '',
  };
}

export function toItem(layouts: ILayout): IListCardItem {
  return { id: layouts.id, title: layouts.title, content: <img src={layouts.icon_url}/> };
}

export function layoutToEditEntity({ id, body, title }: ILayout): IEditEntity {
  return {
    id,
    folderId: null,  // set root folder
    html: body,
    idFrontEnd: new Date().getTime().toString(),
    type: EntityType.Layout,
    params: {
      title,
    },
  };
}
