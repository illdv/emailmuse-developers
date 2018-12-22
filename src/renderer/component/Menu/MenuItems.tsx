import * as React from 'react';
import { ReactElement } from 'react';
import {
  Collections,
  Drafts,
  PictureInPictureAlt,
  SupervisorAccount,
  Help,
  ViewCompact,
  PlayCircleOutline,
  Lock,
} from '@material-ui/icons';
import {
  ListItemIcon,
  Typography,
  WithStyles,
  withStyles,
  MenuItem,
  Tooltip,
  Button,
  Theme,
} from '@material-ui/core/';
import {
  IDrawerMenuActions,
  MenuItemType,
} from 'src/renderer/component/Menu/flux/interface';
import { classNamesEmails } from 'src/renderer/component/Tutorial/steps/emails';

const menuSchema: IMenuItem[] = [
  {
    title: 'Emails',
    icon: <Drafts />,
    type: MenuItemType.EMAILS,
    className: classNamesEmails.EMAILS,
  },
  {
    title: 'Image library',
    icon: <Collections />,
    type: MenuItemType.IMAGE_LIBRARY,
    className: classNamesEmails.IMAGE_LIBRARY,
  },
  {
    title: 'Snippets',
    icon: <ViewCompact />,
    type: MenuItemType.SNIPPETS,
    className: classNamesEmails.SNIPPETS,
  },
  {
    title: 'Layouts',
    icon: <PictureInPictureAlt />,
    type: MenuItemType.LAYOUTS,
    className: classNamesEmails.LAYOUTS,
  },
  {
    title: 'Swipes',
    icon: <PlayCircleOutline />,
    type: MenuItemType.SWIPES,
    className: classNamesEmails.SWIPES,
  },
  {
    title: 'Training',
    icon: <PlayCircleOutline />,
    type: MenuItemType.TRAINING,
    className: classNamesEmails.TRAINING,
  },
];

const enum Route {
  emails = 'emails',
  editor = 'editor',
  imageLibrary = 'image library',
  snippets = 'snippets',
  layouts = 'layouts',
  swipes = 'swipes',
  swipesLocked = 'swipes locked',
  training = 'training',
}
interface ItemProps {
  title: string;
  icon: any;
  onClick: () => void;
  isLockedSwipe?: boolean;
  currentRoute?: Route;
  className?: string;
}

const Item = ({
  title,
  icon,
  onClick,
  isLockedSwipe,
  className,
  currentRoute,
}: ItemProps) => {
  const getRootRoute = (r: Route) => {
    let route = r;
    if (route.includes(Route.emails) || route === Route.editor) {
      route = Route.emails;
    }
    if (route.includes(Route.training)) {
      route = Route.training;
    }
    if (route === Route.swipesLocked) {
      route = Route.swipes;
    }
    return route;
  };

  const isSelected =
    currentRoute && getRootRoute(currentRoute) === title.toLowerCase();
  return (
    <MenuItem
      button
      onClick={onClick}
      selected={isSelected}
      className={className}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <Typography variant='subheading'>{title}</Typography>
      {isLockedSwipe && title.toUpperCase() === MenuItemType.SWIPES && (
        <Lock style={{ color: 'rgba(0, 0, 0, 0.54)', marginLeft: 'auto' }} />
      )}
    </MenuItem>
  );
};

interface IMenuItem {
  title: string;
  icon: ReactElement<any>;
  type: MenuItemType;
  selectedItem?: string;
  className?: string;
}

export interface IProps extends WithStyles<typeof styles> {
  actions: IDrawerMenuActions;
  isLockedSwipe: boolean;
  pathname: string;
}

class MenuItems extends React.Component<IProps> {
  state = {
    selectedItem: MenuItemType.EMAILS,
  };
  selectItem = (selectedItem: MenuItemType) => () => {
    this.props.actions.selectMenuItem({ selectedItem });
  };

  render() {
    const { primary } = this.props.theme.palette;
    const currentRoute: any = this.props.pathname.slice(1).replace(/-/gi, ' ');
    const toItem = (items: IMenuItem[]) => {
      return items.map(item => (
        <Item
          key={item.title}
          title={item.title}
          icon={item.icon}
          onClick={this.selectItem(item.type)}
          isLockedSwipe={this.props.isLockedSwipe}
          className={item.className}
          currentRoute={currentRoute}
        />
      ));
    };

    return (
      <>
        {toItem(menuSchema)}
        <div className={this.props.classes.btnWrapper}>
          <Tooltip title='Account'>
            <Button
              style={{
                backgroundColor:
                  currentRoute === MenuItemType.ACCOUNT.toLocaleLowerCase()
                    ? primary.light
                    : primary.main,
              }}
              classes={{ root: this.props.classes.btn }}
              variant='fab'
              color='primary'
              aria-label='add'
              className={classNamesEmails.ACCOUNT}
              onClick={this.selectItem(MenuItemType.ACCOUNT)}
            >
              <SupervisorAccount />
            </Button>
          </Tooltip>
          <Tooltip title='Help'>
            <Button
              style={{
                backgroundColor:
                  currentRoute === MenuItemType.HELP.toLocaleLowerCase()
                    ? primary.light
                    : primary.main,
              }}
              classes={{ root: this.props.classes.btn }}
              variant='fab'
              color='primary'
              aria-label='add'
              className={classNamesEmails.HELP}
              onClick={this.selectItem(MenuItemType.HELP)}
            >
              <Help />
            </Button>
          </Tooltip>
        </div>
      </>
    );
  }
}

const styles = ({ spacing, palette }: Theme) => ({
  btn: {
    '&:first-child': {
      marginLeft: spacing.unit * 2,
    },
    '&:not(:first-child)': {
      marginLeft: spacing.unit,
    },
  },
  btnWrapper: {
    marginTop: 'auto',
    display: 'flex',
    marginBottom: spacing.unit * 2,
  },
});

export default withStyles(styles, { withTheme: true })(MenuItems);
