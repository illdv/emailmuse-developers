import * as React from 'react';
import block from 'bem-ts';
import { Button, Card, CardContent, IconButton, Typography, withStyles } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

import './LayoutCard.scss';

const b = block('layout-card');

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    padding: '2px',
  },
  input: {
    display: 'none',
  },
});

const LayoutCard = props => {
  const { cardTitle, children, onClick, classes } = props;
  return (
    <Card className={b()} onClick={onClick}>
      <div className={b('action_button')}>
        <IconButton className={classes.button} aria-label='delete template'>
          <Delete className={classes.rightIcon} />
        </IconButton>
        <IconButton className={classes.button}>
          <Edit className={classes.rightIcon} aria-label='edit template' />
        </IconButton>
      </div>
      <CardContent>
        <Typography component='p' align='center'>
          {children}
        </Typography>
      </CardContent>
      <Typography variant='headline' align='center'>
        {cardTitle ? cardTitle : null}
      </Typography>

    </Card>
);
};

export default withStyles(styles)(LayoutCard);
