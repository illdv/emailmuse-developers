import * as React from 'react';
import { Component } from 'react';
import { Lock } from '@material-ui/icons';
import {
  Typography,
  Theme,
  createStyles,
  Paper,
  Fade,
} from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core';

import { ISwipeActions, SwipeActions } from './flux/actions';
import { classNamesSwipeLocked } from '../Tutorial/steps/swipesLocked';
import { APP_DOMAIN } from 'src/common/constants';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { connect } from 'react-redux';
import { IProfileState } from '../Profile/flux/models';
import { Dispatch } from 'redux';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
export interface IProps extends WithStyles<typeof styles> {
  url: string;
  swipeActions: ISwipeActions;
  profile?: IProfileState;
}

class SwipeLocked extends Component<IProps> {
  onCopyUrl = url => () => this.props.swipeActions.copiedUrl.SUCCESS({ url });

  render() {
    const { classes, profile } = this.props;
    const user = profile.auth.user;
    const url = APP_DOMAIN() + '/r/' + user.id;

    return (
      <Fade in timeout={500}>
        <Paper
          classes={{ root: classes.wrapper }}
          className={classNamesSwipeLocked.SWIPE_LOCKED_BODY}
        >
          <Typography variant='headline' classes={{ root: classes.title }}>
            Swipe Vault:&nbsp;
            <b>Locked</b>
            <Lock className={classes.icon} />
          </Typography>
          <Typography className={classes.textBlock}>
            Unlock the Swipe Vault by sharing EmailMuse with your friends on
            Facebook or Twitter.
          </Typography>
          <Typography
            className={classes.urlBlock}
            onClick={this.onCopyUrl(url)}
          >
            {url}
          </Typography>
          <Typography className={classes.textBlock}>
            Share on&nbsp;
            <a className={classes.anchor} href='https://www.facebook.com/'>
              Facebook
            </a>
            ,&nbsp;
            <a className={classes.anchor} href='https://twitter.com/'>
              Twitter
            </a>
            , email, mobile or however you want.
          </Typography>
          <Typography className={classes.textBlock}>
            When just one new person downloads EmailMuse (which is free for
            them) you will get instant access to the Swipe Vault.
          </Typography>
        </Paper>
      </Fade>
    );
  }
}

const styles = ({ spacing, palette }: Theme) => {
  const blockStyle = {
    marginTop: spacing.unit * 5,
    fontSize: '1.3rem',
  };
  return createStyles({
    wrapper: {
      padding: 30,
      height: '100%',
    },
    textBlock: {
      ...blockStyle,
    },
    title: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      color: palette.action.active,
      marginLeft: spacing.unit * 2,
    },
    urlBlock: {
      'border': '2px solid rgba(241,241,241, 0.7)',
      'padding': spacing.unit,
      'transition': '0.5s',
      'cursor': 'pointer',
      ...blockStyle,
      '&:hover': {
        border: '2px solid rgba(241,241,241, 1)',
      },
    },
    anchor: {
      'color': palette.text.primary,
      'transition': '0.5s',
      '&:hover, &:focus': {
        color: palette.text.secondary,
        textDecoration: 'none',
      },
      '&:active': {
        color: palette.text.primary,
        textDecoration: 'underline',
      },
    },
  });
};

const mapStateToProps = (state: IGlobalState) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  swipeActions: bindModuleAction(SwipeActions, dispatch),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SwipeLocked),
);
