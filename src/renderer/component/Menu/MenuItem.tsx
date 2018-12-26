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
import { MenuItemType, Routes } from './flux/interface';
import { IMenuItem } from './MenuList';

interface ItemProps extends IMenuItem {
  onClick: () => void;
  currentRoute: Routes;
}

const Item = ({
  title,
  icon,
  onClick,
  isLockedSwipe,
  className,
  currentRoute,
}: ItemProps) => {
  return (
    <MenuItem
      button
      onClick={onClick}
      selected={currentRoute === title}
      className={className}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <Typography variant='subheading' style={{ textTransform: 'capitalize' }}>
        {title}
      </Typography>
      {isLockedSwipe && title.toUpperCase() === MenuItemType.SWIPES && (
        <Lock style={{ color: 'rgba(0, 0, 0, 0.54)', marginLeft: 'auto' }} />
      )}
    </MenuItem>
  );
};

export default Item;
