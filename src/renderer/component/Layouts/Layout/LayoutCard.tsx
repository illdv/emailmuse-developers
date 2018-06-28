import * as React from 'react';
import block from 'bem-ts';
import { Card, CardContent, Grid, IconButton, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

import './LayoutCard.scss';

const b = block('layout-card');

const LayoutCard = props => {
  const { cardTitle, children, onClick, onDelete, onEdit } = props;
  return (
    <Card className={b()} onClick={onClick}>
      <CardContent>
        <Typography component='p' align='center'>
          {children}
        </Typography>
      </CardContent>
      <Typography variant='headline' align='center'>
        {cardTitle ? cardTitle : null}
      </Typography>
      <Grid container justify={'flex-end'}>
        <IconButton className={b('button')} aria-label='delete template' onClick={onDelete}>
          <Delete />
        </IconButton>
        <IconButton className={b('button')} aria-label='edit template' onClick={onEdit}>
          <Edit />
        </IconButton>
      </Grid>
    </Card>
);
};

export default LayoutCard;
