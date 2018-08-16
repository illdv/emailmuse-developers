import * as React from 'react';
import { Component } from 'react';
import { Table, TableBody } from '@material-ui/core';

import './NodeTable.scss';
import { Loading } from 'src/renderer/common/Loading';
import { NodeTableHead } from 'src/renderer/component/Emails/NodeList/NodeTableHead';
import { IEmail, IFolderEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { IFolder } from 'src/renderer/component/Folder/flux/interface';
import DragDropContext from 'src/renderer/DragDropContext';
import { NodeTableFolderEmail } from 'src/renderer/component/Emails/NodeList/NodeTableFolderEmail';
import { emailToFolderEmail, folderToFolderEmail } from 'src/renderer/component/Emails/utils';

export interface IColumn {
  id: string;
  label: string;
  disablePadding: boolean;
  numeric: boolean;
}

export interface IListItem {
  id: string;
  title: string;
  description: string;
  rightText: string;
}

export namespace ListElementSpace {
  export interface IState {
    selectedItemIds: number[];
  }

  export interface IProps<T> {
    emails: IEmail[];
    folders: IFolder[];
    toItem: (item: T) => IListItem;
    onOpenItem: (item: T) => void;
    onDeleteItem: (item: T) => void;
    onUpdateItem: (data: { id: number, folder_id: number }) => void;

    onChangePage: (event, page: number) => void;
    isLoading?: boolean;
    onCopy?: (id: string) => void;
    columnData?: IColumn[];
    onCurrentParentId?: (id: number) => void;
  }
}

@DragDropContext
export class NodeTableList extends Component<ListElementSpace.IProps<any>, ListElementSpace.IState> {
  state: ListElementSpace.IState = {
    selectedItemIds: [],
  };

  onSelect = (selectId: string) => () => {
    if (this.isSelected(selectId)) {
      this.unSelect(selectId);
    } else {
      this.select(selectId);
    }
  }

  get nodes(): IFolderEmail[] {
    const emails: IFolderEmail[] = !this.props.emails ? [] :
      this.props.emails.map(email => emailToFolderEmail(email));
    const folders: IFolderEmail[] = !this.props.folders ? [] :
      this.props.folders.map(folder => folderToFolderEmail(folder));

    return [...emails, ...folders];
  }

  private select = (selectId: string) => {
    this.setState(state => ({
      ...state,
      selectedItemIds: [...state.selectedItemIds, Number(selectId)],
    }));
  }

  private unSelect = (selectId: string) => {
    this.setState(state => ({
      ...state,
      selectedItemIds: state.selectedItemIds.filter(id => id !== Number(selectId)),
    }));
  }

  isSelected = (selectId: string) => {
    return this.state.selectedItemIds.some(id => id === Number(selectId));
  }

  onSelectAll = () => {
    const selectedItemIds = this.state.selectedItemIds;
    const entities = this.props.emails;

    if (selectedItemIds.length === entities.length) {
      this.unSelectAll();
    } else {
      this.selectAll();
    }
  }

  selectAll = () => {
    this.setState(state => ({
      ...state,
      selectedItemIds: this.props.emails.map(entity => entity.id),
    }));
  }

  unSelectAll = () => {
    this.setState(state => ({
      ...state,
      selectedItemIds: [],
    }));
  }

  render() {
    const { onOpenItem, isLoading, columnData, onDeleteItem, onUpdateItem } = this.props;
    if (isLoading) {
      return <Loading style={{ height: 200 }}/>;
    }
    return (
      <div style={{ minHeight: 200 }}>
        <Table aria-labelledby='tableTitle'>
          <NodeTableHead
            onSelectAll={this.onSelectAll}
            columnData={columnData}
          />
          <TableBody>
            {
              this.nodes.map((item: any) => {
                return (
                  <NodeTableFolderEmail
                    key={`${item.id}-${item.type}`}
                    item={item}
                    onOpenItem={onOpenItem}
                    onUpdateEmail={onUpdateItem}
                    onDeleteFolder={onDeleteItem}
                  />
                );
              })
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

/*  const menuItems = [
    {
      label: 'Create a new folder',
      click: () => alert('I was clicked!'),
    },
    {
      label: 'Update a folder',
      click: () => alert('I was clicked!'),
    },
    {
      label: 'Delete a folder',
      click: (e) => console.log('event', e),
    },
  ];*/
