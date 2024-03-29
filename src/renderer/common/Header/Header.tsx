import * as React from 'react';
import { Toolbar, Typography } from '@material-ui/core';

interface IheaderToolbar {
  numSelected?: number;
  title?: string;
  onClick?: () => void;
}

const HeaderToolbar: React.SFC<IheaderToolbar> = ({ numSelected, title = '', onClick }) => {
  const render = () => {
    if (numSelected === 0) {
      return (
        <Typography variant='title' id='tableTitle'>
          {title ? title : ''}
        </Typography>
      );
    }
    return (
      <Typography color='inherit' variant='subheading'>
        {title} {numSelected}
      </Typography>
    );
  };

  return (
    <Toolbar onClick={onClick}>
      <div style={{ flex: '0 0 auto' }}>
        {render()}
      </div>
      <div style={{ flex: '1 1 100%' }}/>
    </Toolbar>
  );
};

export default HeaderToolbar;
