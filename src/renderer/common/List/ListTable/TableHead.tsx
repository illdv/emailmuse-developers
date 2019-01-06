import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  Checkbox,
  TableCell,
  TableRow,
  TableSortLabel,
  Tooltip,
  TableHead,
} from '@material-ui/core';

interface IColumn {
  id: string;
  disablePadding: boolean;
  label: string;
}

export namespace TableHeadSpace {
  export interface IState {
    isSelectAll: boolean;
  }

  export interface IProps {
    columnData: IColumn[];
    onSelectAll: () => void;
  }
}

export class CustomTableHead extends Component<
  TableHeadSpace.IProps,
  TableHeadSpace.IState
> {
  state: TableHeadSpace.IState = {
    isSelectAll: false,
  };

  // onSortColumn = (id: string) => () => {};

  onSelectAll = () => {
    this.props.onSelectAll();
    this.setState(state => ({
      isSelectAll: !state.isSelectAll,
    }));
  };

  render() {
    return (
      <TableHead>
        <TableRow>
          <TableCell padding='checkbox' />
          {this.props.columnData.map((column: IColumn) => {
            return (
              <TableCell
                key={column.id}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={'asc'}
              >
                <TableSortLabel
                  active={false}
                  direction={'asc'}
                  // onClick={this.onSortColumn(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}
