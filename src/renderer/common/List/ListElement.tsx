import * as React from 'react';
import { Component } from 'react';
import { Divider, Grid, List, ListItem, TablePagination, Typography } from '@material-ui/core';
import InCenter from 'src/renderer/common/InCenter';
import { IPagination } from 'src/renderer/common/List/interface';

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

  }

  export interface IProps<T> {
    entities: T[];
    toItem: (item: T) => ICustomItem;
    selectItem: (T) => () => void;
    pagination: IPagination;
    onChangePage: (event, page: number) => void;
  }
}

export class ListElement extends Component<ListElementSpace.IProps<any>, ListElementSpace.IState> {

  state = {};

  list = () => {
    const { entities, selectItem, toItem } = this.props;

    if (!entities.length) {
      return (
        <InCenter>
          <Typography variant='headline' noWrap align='center' style={{marginTop: 10}}>List empty</Typography>
        </InCenter>
      );
    }

    return (
      <List component='nav'>
        {
          entities.map(entity => (
            <div key={entity.id} onClick={selectItem(entity)}>
              <CustomItem item={toItem(entity)}/>
              <Divider/>
            </div>
          ))
        }
      </List>
    );
  }

  render() {
    const { pagination, onChangePage } = this.props;

    return (
      <>
        {this.list()}
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
