import * as React from 'react';
import { Component } from 'react';
import { Grid, Table, TableBody, TablePagination } from '@material-ui/core';

import InCenter from 'src/renderer/common/InCenter';
import { IPagination } from 'src/renderer/common/List/interface';
import HeaderToolbar from 'src/renderer/common/Header/Header';

import './NodeTable.scss';
import { Search } from 'src/renderer/common/Search';
import { Loading } from 'src/renderer/common/Loading';
import { NodeTableHead } from 'src/renderer/component/Emails/NodeList/NodeTableHead';
import NodeTableRow from 'src/renderer/component/Emails/NodeList/NodeTableRow';
import NodeTableFolder from 'src/renderer/component/Emails/NodeList/NodeTableFolder';
import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { IFolder } from 'src/renderer/component/Folder/flux/interface';
import DragDropContext from 'src/renderer/DragDropContext';

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
    selectedItemIds: string[];
  }

  export interface IProps<T> {
    emails: IEmail[];
    folders: IFolder[];
    toItem: (item: T) => IListItem;
    pagination?: IPagination;
    onOpenItem: (T) => void;
    onChangePage: (event, page: number) => void;
    onDeleteFolder: (id: number) => void;
    onUpdateEmail: (email: IEmail) => void;
    isLoading?: boolean;
    title?: string;
    onCopy?: (id: string) => void;
    onSearch?: (searchWorld: string) => void;
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

  private select = (selectId: string) => {
    this.setState(state => ({
      ...state,
      selectedItemIds: [...state.selectedItemIds, selectId],
    }));
  }

  private unSelect = (selectId: string) => {
    this.setState(state => ({
      ...state,
      selectedItemIds: state.selectedItemIds.filter(id => id !== selectId),
    }));
  }

  isSelected = (selectId: string) => {
    return this.state.selectedItemIds.some(id => id === selectId);
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

  get renderTable() {
    const {
      emails, toItem, onOpenItem,
      isLoading, columnData, onCopy, folders,
      onDeleteFolder, onUpdateEmail,
    } = this.props;
    if (isLoading) {
      return <Loading style={{ height: 200 }}/>;
    }
    return (
      <Table aria-labelledby='tableTitle'>
        <NodeTableHead
          onSelectAll={this.onSelectAll}
          columnData={columnData}
        />
        <TableBody>
          {
            folders && folders.map((item: IFolder) => {
              // console.log('folders', folders);
              const isSelected = this.isSelected(String(item.id));
              return (
                <NodeTableFolder
                  key={`${item.id}-folder`}
                  item={item}
                  isSelected={isSelected}
                  onOpenItem={onOpenItem}
                  onCopy={onCopy}
                  onUpdateEmail={onUpdateEmail}
                  onDeleteFolder={onDeleteFolder}
                />
              );
            })
          }
          {
            emails && emails.map((entity: {}) => {
              const item: IListItem = toItem(entity);
              const isSelected = this.isSelected(item.id);
              return (
                <NodeTableRow
                  key={`${item.id}-email`}
                  entity={entity}
                  item={item}
                  isSelected={isSelected}
                  onOpenItem={onOpenItem}
                  onUpdateEmail={onUpdateEmail}
                  onCopy={onCopy}
                />
              );
            })

          }
        </TableBody>
      </Table>
    );
  }

  render() {
    const { pagination, onChangePage, onSearch } = this.props;

    return (
      <>
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            alignItems={'center'}
            justify={'space-between'}
            style={{ marginTop: 0 }}
          >
            <Grid item>
              <HeaderToolbar title={this.props.title}/>
            </Grid>
            <Grid style={{ paddingRight: 15 }} item>
              {
                onSearch &&
                <Search search={onSearch}/>
              }
            </Grid>
          </Grid>
        </Grid>
        <div style={{ minHeight: 200 }}>
          {this.renderTable}
        </div>
        <InCenter>
          {
            pagination &&
            <TablePagination
              component='div'
              count={pagination.total || 0}
              rowsPerPage={pagination.per_page || 0}
              rowsPerPageOptions={[10]}
              page={pagination.current_page - 1}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={onChangePage}
            />
          }
        </InCenter>
      </>
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
