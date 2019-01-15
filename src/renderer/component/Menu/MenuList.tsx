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
} from 'src/renderer/component/Menu/flux/interface';
import { classNamesEmails } from 'src/renderer/component/Tutorial/steps/emails';
import Item from './MenuItem';
import MenuRouteBtn from './MenuRouteBtn';

const menuSchema: IMenuItem[] = [
  {
    icon: <Drafts />,
    type: MenuItemType.emails,
    className: classNamesEmails.EMAILS,
  },
  {
    icon: <Collections />,
    type: MenuItemType.image_library,
    className: classNamesEmails.IMAGE_LIBRARY,
  },
  {
    icon: <ViewCompact />,
    type: MenuItemType.snippets,
    className: classNamesEmails.SNIPPETS,
  },
  {
    icon: <PictureInPictureAlt />,
    type: MenuItemType.layouts,
    className: classNamesEmails.LAYOUTS,
  },
  {
    icon: <PlayCircleOutline />,
    type: MenuItemType.swipes,
    className: classNamesEmails.SWIPES,
  },
  {
    icon: <PlayCircleOutline />,
    type: MenuItemType.training,
    className: classNamesEmails.TRAINING,
  },
];

export interface IMenuItem {
  icon: React.ReactElement<any>;
  type?: MenuItemType;
  selectedItem?: string;
  className?: string;
  isLockedSwipe?: boolean;
}

interface IProps extends WithStyles<typeof styles> {
  actions: IDrawerMenuActions;
  isLockedSwipe: boolean;
  currentRoute: string;
}

class List extends React.Component<IProps> {
  selectItem = (selectedItem: MenuItemType) => () => {
    this.props.actions.selectMenuItem({ selectedItem });
  };

  render() {
    const { classes, currentRoute } = this.props;

    return (
      <MenuList classes={{ root: classes.list }}>
        {menuSchema.map(item => (
          <Item
            key={item.type}
            itemMenu={item}
            selectItem={this.selectItem}
            isLockedSwipe={this.props.isLockedSwipe}
            currentRoute={currentRoute}
          />
        ))}
        <div className={classes.btnWrapper}>
          <MenuRouteBtn
            currentRoute={currentRoute}
            type={MenuItemType.account}
            selectItem={this.selectItem}
            icon={<SupervisorAccount />}
          />
          <MenuRouteBtn
            currentRoute={currentRoute}
            type={MenuItemType.help}
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
