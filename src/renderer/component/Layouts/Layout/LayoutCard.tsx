import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import block from 'bem-ts';
import './LayoutCard.scss';
const b = block('layout-card');

const LayoutCard = props => {
  const { cardTitle, children } = props;
  return (
    <Card className={b()}>
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

export default LayoutCard;
