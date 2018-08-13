import * as React from 'react';
import { Component } from 'react';
import { Grid, IconButton, Table, TableBody, TableCell, TablePagination, TableRow, Toolbar } from '@material-ui/core';
import { ContentCopy as ContentCopyIcon } from '@material-ui/icons';
import block from 'bem-ts';

import InCenter from 'src/renderer/common/InCenter';
import { IPagination } from 'src/renderer/common/List/interface';
import HeaderToolbar from 'src/renderer/common/Header/Header';

import './ListTable.scss';
import { Search } from 'src/renderer/common/Search';
import { Loading } from 'src/renderer/common/Loading';

const b = block('list-element');

export interface IColumn {
  id: string;
  label: string;
  disablePadding: boolean;
  numeric: boolean;
}

// const defaultColumnData: IColumn[] = [
//   { id: '1', label: 'Name', disablePadding: false, numeric: false },
//   { id: '2', label: 'Description', disablePadding: false, numeric: false },
//   { id: '3', label: 'Last update', disablePadding: false, numeric: false },
// ];

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
    entities: T[];
    toItem: (item: T) => IListItem;
    pagination?: IPagination;
    onOpenItem: (T) => () => void;
    onChangePage: (event, page: number) => void;
    isLoading?: boolean;
    title?: string;
    onCopy?: (id: string) => void;
    onSearch?: (searchWorld: string) => void;
    columnData?: IColumn[];
  }
}

export class ListTable extends Component<ListElementSpace.IProps<any>, ListElementSpace.IState> {
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

  /*  onSelectAll = () => {
      const selectedItemIds = this.state.selectedItemIds;
      const entities = this.props.entities;

      if (selectedItemIds.length === entities.length) {
        this.unSelectAll();
      } else {
        this.selectAll();
      }
    }*/

  /*  selectAll = () => {
      this.setState(state => ({
        ...state,
        selectedItemIds: this.props.entities.map(entity => entity.id),
      }));
    }*/

  unSelectAll = () => {
    this.setState(state => ({
      ...state,
      selectedItemIds: [],
    }));
  }

  onCopy = (id: string) => () => {
    if (this.props.onCopy) {
      this.props.onCopy(id);
    }
  }

  renderTable = () => {
    const { entities, toItem, onOpenItem, isLoading, columnData } = this.props;

    if (isLoading) {
      return <Loading style={{ height: 200 }}/>;
    }
    {/*<Folder />*/
    }
    return (
      <Table aria-labelledby='tableTitle'>
        {/*<CustomTableHead*/}
        {/*onSelectAll={this.onSelectAll}*/}
        {/*columnData={columnData}*/}
        {/*/>*/}
        <TableBody>
          {
            entities.map((entity: {}) => {
              const item: IListItem = toItem(entity);
              const isSelected = this.isSelected(item.id);
              return (
                <TableRow
                  role='checkbox'
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={item.id}
                  selected={isSelected}
                  className={b('row')}
                >
                  {
                    this.props.onCopy
                    &&
                    <TableCell
                      style={{ width: 40 }}
                      onClick={this.onCopy(item.id)}
                      padding={'checkbox'}
                    >
                      <IconButton title={'Create Duplicate'}>
                        <ContentCopyIcon/>
                      </IconButton>
                    </TableCell>
                    ||
                    <TableCell onClick={this.onSelect(item.id)} padding='checkbox'/>
                  }
                  <TableCell onClick={onOpenItem(entity)} component='th' scope='row' padding='none'>
                    {item.title}
                  </TableCell>
                  <TableCell onClick={onOpenItem(entity)}>{item.description || '---'}</TableCell>
                  <TableCell onClick={onOpenItem(entity)}>{item.rightText || '---'}</TableCell>
                </TableRow>
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
          {this.renderTable()}
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
