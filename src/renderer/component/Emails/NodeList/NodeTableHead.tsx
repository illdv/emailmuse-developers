import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { TableCell, TableRow, TableSortLabel, TableHead } from '@material-ui/core';
import { IColumnNodeTable, SortingType } from 'src/renderer/component/Emails/NodeList/NodeTableList';

export namespace TableHeadSpace {
  export interface IState {
    isSelectAll: boolean;
  }

  export interface IProps {
    columnData: IColumnNodeTable[];
    onSelectAll: () => void;
    onSorting: (type: SortingType) => void;
  }
}

export class NodeTableHead extends Component<TableHeadSpace.IProps, TableHeadSpace.IState> {

  state: TableHeadSpace.IState = {
    isSelectAll: false,
  };

  onSortColumn = (type: SortingType) => () => {
    this.props.onSorting(type);
  }

  onSelectAll = () => {
    this.props.onSelectAll();
    this.setState(state => ({
      isSelectAll: !state.isSelectAll,
    }));
  }

  render() {
    return (
      <TableHead>
        <TableRow>
          <TableCell padding='checkbox'/>
          {this.props.columnData.map((column: IColumnNodeTable) => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={'asc'}
              >
                <TableSortLabel
                  active={column.active}
                  direction={'asc'}
                  onClick={this.onSortColumn(column.sortingType)}
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
