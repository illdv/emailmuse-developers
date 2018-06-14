import * as React from 'react';
import { Component } from 'react';
import {
  Checkbox,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { ContentCopy as ContentCopyIcon, FilterList as FilterListIcon } from '@material-ui/icons';
import block from 'bem-ts';

import InCenter from 'src/renderer/common/InCenter';
import { IPagination } from 'src/renderer/common/List/interface';
import { CustomTableHead } from 'src/renderer/common/List/TableHead';

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
    onSelectItem: (T) => () => void;
    onChangePage: (event, page: number) => void;
    onCopy?: (id: string) => void;
  }
}

export class ElementList extends Component<ListElementSpace.IProps<any>, ListElementSpace.IState> {

  state: ListElementSpace.IState = {
    selectedItemIds: [],
  };

  list = () => {
    const { entities, onSelectItem, toItem } = this.props;

    if (!entities.length) {
      return (
        <InCenter>
          <Typography variant='headline' noWrap align='center' style={{ marginTop: 10 }}>List empty</Typography>
        </InCenter>
      );
    }

    return (
      <List component='nav'>
        {
          entities.map(entity => (
            <div key={entity.id} onClick={onSelectItem(entity)}>
              <CustomItem item={toItem(entity)}/>
              <Divider/>
            </div>
          ))
        }
      </List>
    );
  }

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

  onCopy = () => {
    const selectedId = this.state.selectedItemIds[0];
    if (this.props.onCopy) {
      this.props.onCopy(selectedId);
    }
  }

  render() {
    const { pagination, onChangePage, entities } = this.props;

    return (
      <>
        <EnhancedTableToolbar onCopy={this.onCopy} numSelected={this.state.selectedItemIds.length}/>
        <div className={b()}>
          <Table aria-labelledby='tableTitle'>
            <CustomTableHead
              onSelectAll={this.onSelectAll}
              columnData={columnData}
            />
            <TableBody>
              {entities.map((entity: ICustomItem) => {
                const isSelected = this.isSelected(entity.id);
                return (
                  <TableRow
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={entity.id}
                    selected={isSelected}
                  >
                    <TableCell style={{ width: 40 }} onClick={this.onSelect(entity.id)} padding='checkbox'>
                      <Checkbox checked={isSelected}/>
                    </TableCell>
                    <TableCell onClick={this.props.onSelectItem(entity)} component='th' scope='row' padding='none'>
                      {entity.title}
                    </TableCell>
                    <TableCell onClick={this.props.onSelectItem(entity)}>{entity.description || '---'}</TableCell>
                    <TableCell onClick={this.props.onSelectItem(entity)}>{entity.rightText || '---'}</TableCell>
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

function EnhancedTableToolbar(props: { numSelected: number, onCopy: () => void }) {
  const { numSelected } = props;

  return (
    <Toolbar>
      <div style={{ flex: '0 0 auto' }}>
        {
          numSelected === 0 &&
          <Typography variant='title' id='tableTitle'>
            List item
          </Typography>
          ||
          <Typography color='inherit' variant='subheading'>
            {numSelected} selected
          </Typography>
        }
      </div>
      <div style={{ flex: '1 1 100%' }}/>
      <div>
        {
          numSelected === 0 &&
          <Tooltip title='Filter list'>
            <IconButton aria-label='Filter list'>
              <FilterListIcon/>
            </IconButton>
          </Tooltip>
          ||
          numSelected === 1 &&
          <Tooltip title='Copy'>
            <IconButton aria-label='Copy'>
              <ContentCopyIcon/>
            </IconButton>
          </Tooltip>
        }
      </div>
    </Toolbar>
  );
}
