import * as React from 'react';
import { Component } from 'react';
import {
Grid,
IconButton,
ListItem,
Table,
TableBody,
TableCell,
TablePagination,
TableRow,
Typography,
} from '@material-ui/core';
import { ContentCopy as ContentCopyIcon } from '@material-ui/icons';
import block from 'bem-ts';

import InCenter from 'src/renderer/common/InCenter';
import { IPagination } from 'src/renderer/common/List/interface';
import { CustomTableHead } from 'src/renderer/common/List/TableHead';
import HeaderToolbar from 'src/renderer/common/Header/Header';

import './ElementList.scss';

const b = block('list-element');

const columnData = [
  { id: '1', label: 'Name', disablePadding: false, numeric: false },
  { id: '2', label: 'Description', disablePadding: false, numeric: false },
  { id: '3', label: 'Last update', disablePadding: false, numeric: false },
];

export interface ICustomItem {
  id: string;
  title: string;
  description: string;
  rightText: string;
}

function CustomItem(props: { item: ICustomItem }) {
  const { title, description, rightText } = props.item;
  return (
    <ListItem button>
      <Grid container spacing={24}>
        <Grid item xs={4}>
          <Typography gutterBottom noWrap>{title || '---'}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography align={'center'} gutterBottom noWrap>{description || '---'}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography align={'right'} gutterBottom noWrap>{rightText || '---'}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export namespace ListElementSpace {
  export interface IState {
    selectedItemIds: string[];
  }

  export interface IProps<T> {
    entities: T[];
    toItem: (item: T) => ICustomItem;
    pagination: IPagination;
    onOpenItem: (T) => () => void;
    onChangePage: (event, page: number) => void;
    title?: string;
    onCopy?: (id: string) => void;
  }
}

export class ElementList extends Component<ListElementSpace.IProps<any>, ListElementSpace.IState> {

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
    const entities        = this.props.entities;

    if (selectedItemIds.length === entities.length) {
      this.unSelectAll();
    } else {
      this.selectAll();
    }
  }

  selectAll = () => {
    this.setState(state => ({
      ...state,
      selectedItemIds: this.props.entities.map(entity => entity.id),
    }));
  }

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

  render() {
    const { pagination, onChangePage, entities, toItem, onOpenItem } = this.props;

    return (
      <>
        <HeaderToolbar numSelected={this.state.selectedItemIds.length} title={this.props.title} />
        <div>
          <Table aria-labelledby='tableTitle'>
            <CustomTableHead
              onSelectAll={this.onSelectAll}
              columnData={columnData}
            />
            <TableBody>
              {entities.map((entity: {}) => {
                const item: ICustomItem = toItem(entity);
                const isSelected        = this.isSelected(item.id);
                return (
                  <TableRow
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={item.id}
                    selected={isSelected}
                    className={b('row')}
                  >
                    {this.props.onCopy &&
                    <TableCell
                      style={{ width: 40 }}
                      onClick={this.onCopy(item.id)}
                      padding={'checkbox'}
                    >
                      <IconButton title={'Copy'}>
                        <ContentCopyIcon/>
                      </IconButton>
                    </TableCell>
                      || <TableCell onClick={this.onSelect(item.id)} padding='checkbox'/>
                    }
                    <TableCell onClick={onOpenItem(entity)} component='th' scope='row' padding='none'>
                      {item.title}
                    </TableCell>
                    <TableCell onClick={onOpenItem(entity)}>{item.description || '---'}</TableCell>
                    <TableCell onClick={onOpenItem(entity)}>{item.rightText || '---'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <InCenter>
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
        </InCenter>
      </>
    );
  }
}
