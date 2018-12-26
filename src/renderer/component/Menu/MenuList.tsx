import * as React from 'react';
import {
  Collections,
  Drafts,
  PictureInPictureAlt,
  SupervisorAccount,
  Help,
  ViewCompact,
  PlayCircleOutline,
} from '@material-ui/icons';
import {
  WithStyles,
  withStyles,
  Tooltip,
  Button,
  Theme,
  MenuList,
  createStyles,
} from '@material-ui/core/';
import {
  IDrawerMenuActions,
  MenuItemType,
  Routes,
} from 'src/renderer/component/Menu/flux/interface';
import { classNamesEmails } from 'src/renderer/component/Tutorial/steps/emails';
import Item from './MenuItem';
import MenuRouteBtn from './MenuRouteBtn';

const menuSchema: IMenuItem[] = [
  {
    title: Routes.emails,
    icon: <Drafts />,
    type: MenuItemType.EMAILS,
    className: classNamesEmails.EMAILS,
  },
  {
    title: Routes.imageLibrary,
    icon: <Collections />,
    type: MenuItemType.IMAGE_LIBRARY,
    className: classNamesEmails.IMAGE_LIBRARY,
  },
  {
    title: Routes.snippets,
    icon: <ViewCompact />,
    type: MenuItemType.SNIPPETS,
    className: classNamesEmails.SNIPPETS,
  },
  {
    title: Routes.layouts,
    icon: <PictureInPictureAlt />,
    type: MenuItemType.LAYOUTS,
    className: classNamesEmails.LAYOUTS,
  },
  {
    title: Routes.swipes,
    icon: <PlayCircleOutline />,
    type: MenuItemType.SWIPES,
    className: classNamesEmails.SWIPES,
  },
  {
    title: Routes.training,
    icon: <PlayCircleOutline />,
    type: MenuItemType.TRAINING,
    className: classNamesEmails.TRAINING,
  },
];

export interface IMenuItem {
  title: string;
  icon: React.ReactElement<any>;
  type?: MenuItemType;
  selectedItem?: string;
  className?: string;
  isLockedSwipe?: boolean;
}

interface IProps extends WithStyles<typeof styles> {
  actions: IDrawerMenuActions;
  isLockedSwipe: boolean;
  pathname: string;
}

class List extends React.Component<IProps> {
  selectItem = (selectedItem: MenuItemType) => () => {
    this.props.actions.selectMenuItem({ selectedItem });
  };

  calcCurrentRoute: any = () => {
    const shortRoute = this.props.pathname.replace(/-/gi, ' ').split('/')[1];
    let route = shortRoute;
    if (shortRoute === Routes.editor) {
      route = Routes.emails;
    }
    if (shortRoute === Routes.swipesLocked) {
      route = Routes.emails;
    }
    return route;
  };

  render() {
    const currentRoute = this.calcCurrentRoute();

    const { classes } = this.props;
    return (
      <MenuList classes={{ root: classes.list }}>
        {menuSchema.map(item => (
          <Item
            key={item.title}
            title={item.title}
            icon={item.icon}
            onClick={this.selectItem(item.type)}
            isLockedSwipe={this.props.isLockedSwipe}
            className={item.className}
            currentRoute={currentRoute}
          />
        ))}
        <div className={classes.btnWrapper}>
          <MenuRouteBtn
            currentRoute={currentRoute}
            type={'account'}
            selectItem={this.selectItem}
            icon={<SupervisorAccount />}
          />
          <MenuRouteBtn
            currentRoute={currentRoute}
            type={'help'}
            selectItem={this.selectItem}
            icon={<Help />}
          />
        </div>
      </MenuList>
    );
  }
}

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    list: {
      display: 'flex',
      height: '100%',
      padding: 0,
      flexDirection: 'column',
      overflowY: 'auto',
      position: 'relative',
    },
    btnWrapper: {
      marginTop: 'auto',
      display: 'flex',
      marginBottom: spacing.unit * 2,
    },
  });

export default withStyles(styles)(List);
