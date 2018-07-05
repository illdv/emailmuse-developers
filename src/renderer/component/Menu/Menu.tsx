import * as React from 'react';
import { ReactElement } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Collections,
  Drafts,
  PictureInPictureAlt,
  SupervisorAccount,
  ViewCompact,
  PlayCircleOutline,
} from '@material-ui/icons';
import { IStyle } from 'type/materialUI';
import {
  Button,
  Grid,
  ListItem,
  ListItemIcon,
  MenuList,
  Paper,
  Slide,
  Tooltip,
  Typography, WithStyles, withStyles,
} from '@material-ui/core/';
import { NavLink } from 'react-router-dom';
import { IDrawerMenuActions, MenuItemType } from 'src/renderer/component/Menu/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';

const createMenuSchema = (): IMenuItem[] => {
  return [
    { title: 'Emails', icon: <Drafts/>, type: MenuItemType.TEMPLATES, route: '/emails' },
    { title: 'Image library', icon: <Collections/>, type: MenuItemType.IMAGE_LIBRARY, route: '/image-library' },
    { title: 'Snippets', icon: <ViewCompact/>, type: MenuItemType.SNIPPETS, route: '/snippets' },
    { title: 'Layouts', icon: <PictureInPictureAlt/>, type: MenuItemType.LAYOUTS, route: '/layouts' },
    { title: 'Swipe', icon: <PlayCircleOutline/>, type: MenuItemType.SWIPE, route: '/swipe' },
  ];
};

const styles: IStyle = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  item: {
    paddingLeft: 0,
  },
});

function Item(props: { title: string, icon, route, className?, onClick?: any }) {
  const { className, icon, title, onClick } = props;
  return (
      <ListItem button className={className} onClick={onClick}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <Typography variant='subheading' noWrap>{title}</Typography>
      </ListItem>
  );
}

interface IMenuItem {
  title: string;
  icon: ReactElement<any>;
  className?: string;
  type: MenuItemType;
  route: string;
}

export namespace MenuSpace {
  export interface IProps {
    actions?: IDrawerMenuActions;
  }

  export interface IState {
    treeData: any;
    searchWord: string;
    searchFocusIndex: number;
    isOpen: boolean;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators(DrawerMenuAction, dispatch),
});

@(connect(null, mapDispatchToProps))
class Menu extends React.Component<MenuSpace.IProps & WithStyles<any>, MenuSpace.IState> {

  selectItem = (selectedItem: MenuItemType) => () => {
    this.props.actions.selectMenuItem({ selectedItem });
  }

  render() {
    const { classes } = this.props;
    const menuSchema = createMenuSchema();

    const toItem = (items: IMenuItem[]) => {
      return items.map(item => (
        <div key={item.title}>
          <Item
            title={item.title}
            icon={item.icon}
            route={item.route}
            className={item.className}
            onClick={this.selectItem(item.type)}
          />
        </div>
      ));
    };

    return (
      <Slide direction='right' in mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.root}>
          <MenuList>
            {toItem(menuSchema)}
          </MenuList>
          <Grid
            style={{ height: '100%', marginBottom: 10, marginLeft: 10 }}
            container
            direction={'column'}
            justify={'flex-end'}
          >
            <Tooltip title={'Account'}>
              <Button
                variant='fab'
                color='primary'
                aria-label='add'
                onClick={this.selectItem(MenuItemType.ACCOUNT)}
              >
                <SupervisorAccount/>
              </Button>
            </Tooltip>
          </Grid>
        </Paper>
      </Slide>
    );
  }
}

export default withStyles(styles)(Menu);
