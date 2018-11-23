import * as React from 'react';
import { ReactElement } from 'react';

import {
  Collections,
  Drafts,
  PictureInPictureAlt,
  SupervisorAccount,
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
  withTheme,
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

interface ItemProps {
  title: string;
  icon: any;
  onClick: () => void;
  isLockedSwipe?: boolean;
  selectedItem?: string;
  className?: string;
}

const Item = ({
  title,
  icon,
  onClick,
  selectedItem,
  isLockedSwipe,
  className,
}: ItemProps) => {
  const isSelected =
    selectedItem && selectedItem.replace(/_/gi, ' ') === title.toUpperCase();

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
}

export interface IState {
  selectedItem: string;
}

class MenuItems extends React.Component<IProps, IState> {
  state = {
    selectedItem: MenuItemType.EMAILS,
  };
  selectItem = (selectedItem: MenuItemType) => () => {
    this.setState({
      selectedItem,
    });
    this.props.actions.selectMenuItem({ selectedItem });
  }
  resetTour = () => {
    localStorage.setItem('EMAILS', '0');
    localStorage.setItem('SNIPPETS', '0');
    localStorage.setItem('LAYOUTS', '0');
    localStorage.setItem('IMAGE_LIBRARY', '0');
    localStorage.setItem('SWIPES', '0');
    localStorage.setItem('TRAINING', '0');
    localStorage.setItem('ACCOUNT', '0');
  }

  render() {
    const { primary } = this.props.theme.palette;
    const toItem = (items: IMenuItem[]) => {
      return items.map(item => (
        <Item
          key={item.title}
          title={item.title}
          icon={item.icon}
          onClick={this.selectItem(item.type)}
          selectedItem={this.state.selectedItem}
          isLockedSwipe={this.props.isLockedSwipe}
          className={item.className}
        />
      ));
    };

    return (
      <>
        {toItem(menuSchema)}
        <Item
          title={'Restart TUTORIALS'}
          icon={<Drafts />}
          onClick={this.resetTour}
        />
        <Tooltip title='Account'>
          <Button
            style={{
              backgroundColor:
                this.state.selectedItem === MenuItemType.ACCOUNT
                  ? primary.light
                  : primary.main,
            }}
            classes={{ root: this.props.classes.btnAcc }}
            variant='fab'
            color='primary'
            aria-label='add'
            className={classNamesEmails.ACCOUNT}
            onClick={this.selectItem(MenuItemType.ACCOUNT)}
          >
            <SupervisorAccount />
          </Button>
        </Tooltip>
      </>
    );
  }
}

const styles = ({ spacing, palette }) => ({
  btnAcc: {
    marginLeft: spacing.unit * 2,
    marginTop: 'auto',
    marginBottom: spacing.unit * 2,
  },
});

export default withStyles(styles, { withTheme: true })(MenuItems);
