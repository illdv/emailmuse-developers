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

interface ItemProps {
  selectItem: any;
  currentRoute: string;
  itemMenu: IMenuItem;
  isLockedSwipe: boolean;
}

const Item = ({
  selectItem,
  isLockedSwipe,
  currentRoute,
  itemMenu: { type, className, icon },
}: ItemProps) => {
  const selectedItem = selectItem(type);
  const title =
    type === MenuItemType.image_library ? type.replace(/_/gi, ' ') : type;
  return (
    <MenuItem
      button
      onClick={selectedItem}
      selected={currentRoute === type}
      className={className}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <Typography variant='subheading' style={{ textTransform: 'capitalize' }}>
        {title}
      </Typography>
      {isLockedSwipe && type === MenuItemType.swipes && (
        <Lock style={{ color: 'rgba(0, 0, 0, 0.54)', marginLeft: 'auto' }} />
      )}
    </MenuItem>
  );
};

export default Item;
