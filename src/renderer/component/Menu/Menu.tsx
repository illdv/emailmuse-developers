import * as React from 'react';
import { ReactElement } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Lock } from '@material-ui/icons';

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
import { IDrawerMenuActions, MenuItemType } from 'src/renderer/component/Menu/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { classNamesEmails } from 'src/renderer/component/Tutorial/steps/emails';

const createMenuSchema = (): IMenuItem[] => {
  return [
    { title: 'Emails', icon: <Drafts/>, type: MenuItemType.EMAILS, className: classNamesEmails.EMAILS },
    { title: 'Image library', icon: <Collections/>, type: MenuItemType.IMAGE_LIBRARY, className: classNamesEmails.IMAGE_LIBRARY },
    { title: 'Snippets', icon: <ViewCompact/>, type: MenuItemType.SNIPPETS, className: classNamesEmails.SNIPPETS },
    { title: 'Layouts', icon: <PictureInPictureAlt/>, type: MenuItemType.LAYOUTS, className: classNamesEmails.LAYOUTS },
    { title: 'Swipes', icon: <PlayCircleOutline/>, type: MenuItemType.SWIPE, className: classNamesEmails.SWIPE },
    { title: 'Training', icon: <PlayCircleOutline/>, type: MenuItemType.TRAINING, className: classNamesEmails.TRAINING },
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

const Item = (props: { title: string, icon, className?, onClick?: any }) => {
  const { className, icon, title, onClick } = props;

  if (title === 'Swipes') {
      return (
        <ListItem button className={className} onClick={onClick}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <Typography variant='subheading' noWrap>{title}</Typography>
            <Lock />
        </ListItem>
      );
  }

  return (
      <ListItem button className={className} onClick={onClick}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <Typography variant='subheading' noWrap>{title}</Typography>
      </ListItem>
  );
};

interface IMenuItem {
  title: string;
  icon: ReactElement<any>;
  className?: string;
  type: MenuItemType;
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
  select = () => {
    localStorage.setItem('EMAILS', '0');
    localStorage.setItem('SNIPPETS', '0');
    localStorage.setItem('LAYOUTS', '0');
    localStorage.setItem('IMAGE_LIBRARY', '0');
    localStorage.setItem('SWIPE', '0');
    localStorage.setItem('TRAINING', '0');
    localStorage.setItem('ACCOUNT', '0');
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
            <Item
              title={'Restart TUTORIALS'}
              icon={<Drafts/>}
              onClick={this.select}
            />
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
                className={classNamesEmails.ACCOUNT}
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
