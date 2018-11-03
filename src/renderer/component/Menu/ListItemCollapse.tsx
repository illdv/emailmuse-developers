import { Component, ReactElement } from 'react';
import * as React from 'react';
import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core/';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

export namespace CollapseListItemSpace {
  export interface IState {
    isOpen: boolean;
  }

  export interface IProps {
    title: string;
    icon: ReactElement<any>;
  }
}

export class CollapseListItem extends Component<
  CollapseListItemSpace.IProps,
  CollapseListItemSpace.IState
> {
  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>{this.props.icon}</ListItemIcon>
          <ListItemText inset primary={this.props.title} />
          {this.state.isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.isOpen} timeout='auto' unmountOnExit>
          {this.props.children}
        </Collapse>
      </div>
    );
  }
}
