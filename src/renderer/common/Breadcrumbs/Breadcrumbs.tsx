import * as React from 'react';
import { Fade, Typography } from '@material-ui/core';
import block from 'bem-ts';
import './Breadcrumbs.scss';

const b = block('breadcrumbs');

interface IBreadcrumbs {
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
      className={b()}
      variant='headline'
      noWrap
    >
      <>
        {
          items.map((item, index) => (
            <Fade key={index} in timeout={500}>
              <span onClick={item.onClick} className={b('item')}>
                {index !== 0 && separator}
                {item.title}
              </span>
            </Fade>
          ))
        }
      </>
    </Typography>
  );
};
