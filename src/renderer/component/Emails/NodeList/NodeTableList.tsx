import * as React from 'react';
import { Component } from 'react';
import { Table, TableBody } from '@material-ui/core';
import moment from 'moment-es6';

import './NodeTable.scss';
import { Loading } from 'src/renderer/common/Loading';
import { NodeTableHead } from 'src/renderer/component/Emails/NodeList/NodeTableHead';
import { IEmail, IFolderEmail, nodeType } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { IFolder } from 'src/renderer/component/Folder/flux/interface';
import DragDropContext from 'src/renderer/DragDropContext';
import { NodeTableFolderEmail } from 'src/renderer/component/Emails/NodeList/NodeTableFolderEmail';
import { emailToFolderEmail, folderToFolderEmail } from 'src/renderer/component/Emails/utils';
import { Padding } from '@material-ui/core/TableCell/TableCell';

export enum SortingType {
  Subject            = 'Subject',
  Description        = 'Description',
  LastUpdate         = 'LastUpdate',
  Type               = 'Type',
}

export interface IColumnNodeTable {
  id: string;
  label: string;
  padding: Padding;
  numeric: boolean;
  sortingType: SortingType;
  active: boolean;
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
    selectedFilter: SortingType;
    reverse: boolean;
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
    onCurrentParentId?: (id: number) => void;
  }
}

@DragDropContext
export class NodeTableList extends Component<ListElementSpace.IProps<any>, ListElementSpace.IState> {
  state: ListElementSpace.IState = {
    selectedItemIds: [],
    selectedFilter: SortingType.Subject,
    reverse: false,
  };

  onSelect = (selectId: string) => () => {
    if (this.isSelected(selectId)) {
      this.unSelect(selectId);
    } else {
      this.select(selectId);
    }
  }

  getNodes(): IFolderEmail[] {
    const emails: IFolderEmail[]  = !this.props.emails ? [] :
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
    const entities        = this.props.emails;

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

  onSorting = (type: SortingType) => {
    if (this.state.selectedFilter === type) {
      this.setState({
        reverse: !this.state.reverse,
      });
    } else {
      this.setState({
        selectedFilter: type,
        reverse: false,
      });
    }
  }

  filterNode = (nodes: IFolderEmail[]): IFolderEmail[] => {
    const { selectedFilter } = this.state;
    let filteredNodes = [];
    if (selectedFilter === SortingType.Subject) {
      filteredNodes = nodes.sort((node1, node2) => node1.title.localeCompare(node2.title));
    }

    if (selectedFilter === SortingType.Description) {
      filteredNodes = nodes.sort((node1, node2) => node1.description.localeCompare(node2.description));
    }

    if (selectedFilter === SortingType.LastUpdate) {
      filteredNodes = nodes.sort((node1, node2) => {
        return moment(node2.updated_at).diff(node1.updated_at);
      });
    }

    if (selectedFilter === SortingType.Type) {
      filteredNodes = nodes.sort((node1, node2) => node1.title.localeCompare(node2.title));
      const filteredFolders = filteredNodes.filter(item => item.type === nodeType.folder);
      const filteredEmails = filteredNodes.filter(item => item.type === nodeType.email);
      if (this.state.reverse) {
        Array.prototype.push.apply(filteredEmails, filteredFolders);
        return filteredEmails;
      } else {
        Array.prototype.push.apply(filteredFolders, filteredEmails);
        return filteredFolders;
      }
    }

    if (this.state.reverse) {
      return filteredNodes.reverse();
    } else {
      return filteredNodes;
    }
  }

  render() {
    const { onOpenItem, isLoading, onDeleteItem, onUpdateItem } = this.props;
    if (isLoading) {
      return <Loading style={{ height: 200 }}/>;
    }

    const nodes = this.filterNode(this.getNodes());

    const { selectedFilter } = this.state;

    const columnData: IColumnNodeTable[] = [
      {
        id: '1',
        label: 'Type',
        padding: 'checkbox',
        numeric: false,
        sortingType: SortingType.Type,
        active: selectedFilter === SortingType.Type,
      },
      {
        id: '2',
        label: 'Subject',
        padding: 'none',
        numeric: false,
        sortingType: SortingType.Subject,
        active: selectedFilter === SortingType.Subject,
      },
      {
        id: '3',
        label: 'Description',
        padding: 'default',
        numeric: false,
        sortingType: SortingType.Description,
        active: selectedFilter === SortingType.Description,
      },
      {
        id: '4',
        label: 'Last update',
        padding: 'default',
        numeric: false,
        sortingType: SortingType.LastUpdate,
        active: selectedFilter === SortingType.LastUpdate,
      },
    ];

    return (
      <div style={{ minHeight: 200 }}>
        <Table aria-labelledby='tableTitle'>
          <NodeTableHead
            onSelectAll={this.onSelectAll}
            reverse={this.state.reverse}
            columnData={columnData}
            onSorting={this.onSorting}
          />
          <TableBody>
            {
              nodes.map((item: any) => {
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
