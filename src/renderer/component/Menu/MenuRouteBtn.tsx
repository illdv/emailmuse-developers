import * as React from 'react';
import {
  Button,
  Tooltip,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { classNamesEmails } from '../Tutorial/steps/emails';

interface IProps extends WithStyles<typeof styles> {
  type: string;
  selectItem: any;
  currentRoute: string;
  icon: React.ReactElement<any>;
}

const RouteBtn = ({
  type,
  classes,
  theme,
  selectItem,
  currentRoute,
  icon,
}: IProps) => {
  const selected = {
    backgroundColor:
      currentRoute === type
        ? theme.palette.primary.light
        : theme.palette.primary.main,
  };
  return (
    <Tooltip title={type}>
      <Button
        style={selected}
        classes={{ root: classes.btn }}
        variant='fab'
        color='primary'
        aria-label={type}
        className={classNamesEmails[type.toUpperCase()]}
        onClick={selectItem(type.toUpperCase())}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    btn: {
      '&:first-child': {
        marginLeft: spacing.unit * 2,
      },
      '&:not(:first-child)': {
        marginLeft: spacing.unit,
      },
    },
  });

export default withStyles(styles, { withTheme: true })(RouteBtn);
