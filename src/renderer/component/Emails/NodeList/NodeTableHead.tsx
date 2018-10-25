import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { TableCell, TableRow, TableSortLabel, TableHead } from '@material-ui/core';
import { IColumnNodeTable, SortingType } from 'src/renderer/component/Emails/NodeList/NodeTableList';
import { classNamesEmails } from 'src/renderer/component/Tutorial/steps/emails';

export namespace TableHeadSpace {
  export interface IState {
    isSelectAll: boolean;
  }

  export interface IProps {
    columnData: IColumnNodeTable[];
    onSelectAll: () => void;
    onSorting: (type: SortingType) => void;
    reverse: boolean;
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
    const { reverse } = this.props;
    return (
      <TableHead>
        <TableRow>
          {this.props.columnData.map((column: IColumnNodeTable) => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.padding || 'default'}
                sortDirection={reverse ? 'desc' : 'asc'}
              >
                <TableSortLabel
                  active={column.active}
                  direction={reverse ? 'desc' : 'asc'}
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
