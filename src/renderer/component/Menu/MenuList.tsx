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

  render() {
    const currentRoute: any = this.props.pathname.slice(1).replace(/-/gi, ' ');

    const { theme, classes } = this.props;
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
          <Tooltip title='Account'>
            <Button
              style={{
                backgroundColor:
                  currentRoute === MenuItemType.ACCOUNT.toLocaleLowerCase()
                    ? theme.palette.primary.light
                    : theme.palette.primary.main,
              }}
              classes={{ root: this.props.classes.btn }}
              variant='fab'
              color='primary'
              aria-label='Account'
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
                    ? theme.palette.primary.light
                    : theme.palette.primary.main,
              }}
              classes={{ root: this.props.classes.btn }}
              variant='fab'
              color='primary'
              aria-label='Help'
              className={classNamesEmails.HELP}
              onClick={this.selectItem(MenuItemType.HELP)}
            >
              <Help />
            </Button>
          </Tooltip>
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

export default withStyles(styles, { withTheme: true })(List);
