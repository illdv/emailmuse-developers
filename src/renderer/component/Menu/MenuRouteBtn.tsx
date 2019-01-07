import * as React from 'react';
import {
  Tooltip,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  Fab,
} from '@material-ui/core';
import { classNamesEmails } from '../Tutorial/steps/emails';

interface IProps extends WithStyles<typeof styles> {
  type: string;
  selectItem: any;
  currentRoute: string;
  icon: React.ReactElement<any>;
  theme: Theme;
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
      <Fab
        style={selected}
        classes={{ root: classes.btn }}
        color='primary'
        aria-label={type}
        className={classNamesEmails[type]}
        onClick={selectItem(type)}
      >
        {icon}
      </Fab>
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
