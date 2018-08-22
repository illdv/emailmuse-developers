import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  createStyles,
  Fade,
  IconButton,
  Snackbar,
  SnackbarContent,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import classNames from 'classnames';

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

const toastVariant = {
  [ToastType.Success]: 'success',
  [ToastType.Info]: 'info',
  [ToastType.Warning]: 'warning',
  [ToastType.Error]: 'error',
};

const variantIcon = {
  Success: CheckCircleIcon,
  Warning: WarningIcon,
  Error: ErrorIcon,
  Info: InfoIcon,
};

const styles = ({ palette, spacing }: Theme) => createStyles({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: palette.error.dark,
  },
  info: {
    backgroundColor: palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  closeButton: {},
});

interface IProps extends WithStyles<typeof styles> {
  toast: FluxToast.IState;
  clear: () => void;
  other: any;
  className: string;
}

const Toast: React.SFC<IProps> = ({ toast, clear, other, classes, className }) => {
  const handleClose = () => clear();
  const { messages, isOpen, type } = toast;

  const Icon = variantIcon[type];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={isOpen}
      autoHideDuration={6000}
      // TransitionComponent={Fade}
      onClick={handleClose}
    >
      <SnackbarContent
        className={classNames(classes[toastVariant[type]], className)}
        aria-describedby='client-snackbar'
        message={
          <span id='client-snackbar' className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)}/>
            {messages}
        </span>
        }
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon className={classes.icon}/>
          </IconButton>,
        ]}
        {...other}
      />
    </Snackbar>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  toast: state.toast,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  clear: () => {
    dispatch(FluxToast.Actions.clear());
  },
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Toast),
);
