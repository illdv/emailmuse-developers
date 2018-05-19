import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Paper, Typography, WithStyles,
  withStyles
} from '@material-ui/core/';

import { Inbox, Drafts, Send, Bookmark, Collections } from '@material-ui/icons';
import { bindActionCreators } from 'redux';
import { FluxDrawerMenu, MenuItemType } from 'src/renderer/component/Menu/flux/action';
import { ReactElement } from 'react';
import { IStyle } from 'type/materialUI';

const createMenuSchema = (): IItem[] => {
  return [
    { title: 'Compose', icon: <Send/>, type: MenuItemType.COMPOSE },
    { title: 'Templates', icon: <Drafts/>, type: MenuItemType.TEMPLATES },
    { title: 'Training', icon: <Inbox/>, type: MenuItemType.TRAINING },
    { title: 'Research', icon: <Bookmark/>, type: MenuItemType.RESEARCH },
    { title: 'Image library', icon: <Collections/>, type: MenuItemType.IMAGE_LIBRARY },
  ];
};

const styles: IStyle = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  item: {
    paddingLeft: 0,
  },
});

function Item(props: { title: string, icon, className?, onClick?: any }) {
  const { className, icon, title, onClick } = props;
  return (
    <ListItem button className={className} onClick={onClick}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <Typography variant="subheading" noWrap>{title}</Typography>
    </ListItem>
  );
}

export namespace MenuSpace {
  export interface IProps {
    accounts: any;
    actions: FluxDrawerMenu.IActions;
  }

  export interface IState {
    treeData: any;
    searchWord: string;
    searchFocusIndex: number;
    isOpen: boolean;
  }
}

interface IItem {
  title: string;
  icon: ReactElement<any>;
  className?: string;
  type: MenuItemType;
}

const mapStateToProps = (state: IGlobalState) => ({
  accounts: state.accounts,
  menu: state.drawerMenu,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators({
    ...FluxDrawerMenu.Actions,
  }, dispatch)
});

@(connect(mapStateToProps, mapDispatchToProps))
class Menu extends React.Component<MenuSpace.IProps & WithStyles<any>, MenuSpace.IState> {
  selectItem = (type: MenuItemType) => () => {
    this.props.actions.onSelectMenuItem(type);
  }

  render() {
    const { classes } = this.props;
    const menuSchema  = createMenuSchema();

    const toItem = (items: IItem[]) => {
      return items.map((item) => (
        <div key={item.title}>
          <Item
            title={item.title}
            icon={item.icon}
            className={item.className}
            onClick={this.selectItem(item.type)}
          />
          <Divider/>
        </div>
      ));
    };

    return (
      <Paper elevation={4} className={classes.root}>
        <List component="nav">
          {toItem(menuSchema)}
        </List>
      </Paper>
    );
  }

  static defaultProps = {
    googleLogin: {},
  };
}

export default withStyles(styles)(Menu as any);
