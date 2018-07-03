import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { IListCardItem } from 'src/renderer/common/List/ListCard/ListCard';
import * as React from 'react';

export function toItem(layouts: ILayout): IListCardItem {
  return { id: layouts.id, title: layouts.title, content: <img src={layouts.icon_url}/> };
}
