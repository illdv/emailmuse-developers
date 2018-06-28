import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import EntityCard from 'src/renderer/common/List/ListCard/EntityCard';
import { IPagination } from 'src/renderer/common/List/interface';
import block from 'bem-ts';

import './ListCard.scss';

const b = block('list-card');

export namespace ListBlocksSpace {
  export interface IState {

  }

  export interface IProps<T> {
    entities: T[];
    toItem: (item: T) => IListCardItem;
    pagination: IPagination;
    onSelectItem: (T) => () => void;
    onRemoveItem: (id: string) => (event?: any) => void;
    onEditItem: (T) => (event?: any) => void;
    onChangePage: (event, page: number) => void;
    title?: string;
  }
}

export interface IListCardItem {
  id: string;
  title: string;
  content: JSX.Element;
}

export class ListCard extends Component<ListBlocksSpace.IProps<any>, ListBlocksSpace.IState> {

  state: ListBlocksSpace.IState = {};

  render() {
    const { entities, toItem, onSelectItem, onRemoveItem, onEditItem } = this.props;
    return (
      <div className={b('list')}>
        {
          mapItem(entities, toItem, (entity, item, index) => (
            <EntityCard
              key={item.id}
              cardTitle={item.title}
              onClick={onSelectItem(entity)}
              onDelete={onRemoveItem && onRemoveItem(item.id)}
              onEdit={onEditItem && onEditItem(entity)}
            >
              {item.content}
            </EntityCard>
          ))
        }
      </div>
    );
  }
}

type callbackMapItem = (entity: object[], item: IListCardItem, index: number) => JSX.Element;

function mapItem<T>(entities, toItem, callback: callbackMapItem): JSX.Element[] {
  return entities.map((entity, index) => callback(entity, toItem(entity), index));
}

export default ListCard;
