import * as React from 'react';
import {
  Toolbar,
  Typography,
} from '@material-ui/core';

interface IheaderToolbar {
  numSelected: number;
  title?: string;
}

const HeaderToolbar: React.SFC<IheaderToolbar> = ({ numSelected = 1, title = 'List item' }) => {
  const render = () => {
    if (numSelected === 0) {
      return (
        <Typography variant='title' id='tableTitle'>
          {title ? title : 'New page'}
        </Typography>
      );
    }
    return (
      <Typography color='inherit' variant='subheading'>
      {title} {numSelected} selected
    </Typography>
    );
  };

  return (
    <Toolbar>
      <div style={{ flex: '0 0 auto' }}>
        {render()}
      </div>
      <div style={{ flex: '1 1 100%' }}/>
    </Toolbar>
  );
};

export default HeaderToolbar;
