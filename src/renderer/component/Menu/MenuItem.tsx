import * as React from 'react';
import {
  createStyles,
  MenuItem,
  ListItemIcon,
  Typography,
  withStyles,
  Theme,
} from '@material-ui/core';
import { Lock } from '@material-ui/icons';
import { MenuItemType } from './flux/interface';
import { IMenuItem } from './MenuList';
import { isFirstTime, onboardingSteps } from 'src/renderer/common/isFirstTime';

interface ItemProps {
  selectItem: any;
  currentRoute: string;
  itemMenu: IMenuItem;
  isLockedSwipe: boolean;
}

interface State {
  currentRoute: string | null;
}

class Item extends React.Component<ItemProps, State> {
  state = {
    currentRoute: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (isFirstTime() && onboardingSteps() === 0) {
      return {
        currentRoute: MenuItemType.snippets,
      };
    }

    return {
      currentRoute: nextProps.currentRoute,
    };
  }

  selectedItem = this.props.selectItem(this.props.itemMenu.type);
  title =
    this.props.itemMenu.type === MenuItemType.image_library
      ? this.props.itemMenu.type.replace(/_/gi, ' ')
      : this.props.itemMenu.type;
  render() {
    const {
      isLockedSwipe,
      itemMenu: { type, className, icon },
    } = this.props;

    return (
      <MenuItem
        button
        onClick={this.selectedItem}
        selected={this.state.currentRoute === type}
        className={className}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <Typography
          variant='subheading'
          style={{ textTransform: 'capitalize' }}
        >
          {this.title}
        </Typography>
        {isLockedSwipe && type === MenuItemType.swipes && (
          <Lock style={{ color: 'rgba(0, 0, 0, 0.54)', marginLeft: 'auto' }} />
        )}
      </MenuItem>
    );
  }
}
export default Item;
