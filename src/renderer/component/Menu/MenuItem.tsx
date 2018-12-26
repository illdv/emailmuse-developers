import * as React from 'react';
import { MenuItem, ListItemIcon, Typography } from '@material-ui/core';
import { Lock } from '@material-ui/icons';
import { MenuItemType, Route } from './flux/interface';
import { IMenuItem } from './MenuList';

interface ItemProps extends IMenuItem {
  onClick: () => void;
  currentRoute?: Route;
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

export default Item;
