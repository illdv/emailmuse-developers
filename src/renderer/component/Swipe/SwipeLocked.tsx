import * as React from 'react';
import { Component } from 'react';
import { Lock } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import { Fade, Paper, WithStyles, withStyles } from '@material-ui/core';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ISwipeActions } from './flux/actions';

export interface IProps extends WithStyles<typeof styles> {
  url: string;
  swipeActions: ISwipeActions;
}

class SwipeLocked extends Component<IProps> {
  onCopyUrl = () => this.props.swipeActions.copiedUrl.SUCCESS({});

  render() {
    const { classes, url } = this.props;

    return (
      <Fade in timeout={500}>
        <Paper style={{ padding: 30, height: '100%' }}>
          <Typography
            variant='headline'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            Swipe Vault:&nbsp;
            <b>Locked</b>
            <Lock style={{ color: 'rgba(0, 0, 0, 0.54)', marginLeft: 10 }} />
          </Typography>
          <Typography className={classes.textBlock}>
            Unlock the Swipe Vault by sharing EmailMuse with your friends on
            Facebook or Twitter.
          </Typography>
          <CopyToClipboard text={url} onCopy={this.onCopyUrl}>
            <Typography className={classes.urlBlock}>{url}</Typography>
          </CopyToClipboard>
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

const styles = ({ spacing, palette }) => {
  const blockStyle = {
    marginTop: spacing.unit * 5,
    fontSize: '1.3rem',
  };
  return {
    textBlock: {
      ...blockStyle,
    },
    urlBlock: {
      'border': '2px solid rgba(241,241,241, 0.7)',
      'paddingLeft': spacing.unit,
      'paddingRight': spacing.unit,
      'transition': '0.5s',
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
  };
};

export default withStyles(styles)(SwipeLocked);
