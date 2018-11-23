import * as React from 'react';
import { Fade, Typography } from '@material-ui/core';
import { classNamesSwipe } from 'src/renderer/component/Tutorial/steps/swipes';

export interface IBreadcrumbs {
  title: string;
  onClick: () => void;
}

export interface IBreadcrumbsProps {
  items: IBreadcrumbs[];
}

export const Breadcrumbs: React.SFC<IBreadcrumbsProps> = ({ items }) => {
  const separator = ' > ';
  return (
    <Typography
      variant='headline'
      noWrap
      className={classNamesSwipe.SWIPE_HEAD}
    >
      <>
        {items.map((item, index) => (
          <Fade key={index} in timeout={500}>
            <span onClick={item.onClick} style={{ cursor: 'pointer' }}>
              {index !== 0 && separator}
              {item.title}
            </span>
          </Fade>
        ))}
      </>
    </Typography>
  );
};
