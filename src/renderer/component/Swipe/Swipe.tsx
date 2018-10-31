import * as React from 'react';
import { Component } from 'react';
import { Check, KeyboardArrowRight, Lock } from '@material-ui/icons';
import { Grid, TextField, Typography, Input } from '@material-ui/core';
import { connect, Dispatch } from 'react-redux';
import {
  Divider,
  Fade,
  List,
  ListItem,
  ListItemText,
  Paper,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import block from 'bem-ts';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ISwipe } from 'src/renderer/component/Swipe/flux/interface';

import { Breadcrumbs } from 'src/renderer/common/Breadcrumbs/Breadcrumbs';
import PreviewMail from 'src/renderer/component/Swipe/PreviewMail';
import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import {
  ISwipeActions,
  SwipeActions,
} from 'src/renderer/component/Swipe/flux/actions';
import { RouteComponentProps } from 'react-router-dom';
import { ISwipeState } from 'src/renderer/component/Swipe/flux/reducer';

import './Swipe.scss';
import { Loading } from 'src/renderer/common/Loading';
import { Fab } from 'src/renderer/common/Fab';
import { classNamesSwipe } from 'src/renderer/component/Tutorial/steps/swipe';

const b = block('swipe');

export namespace SwipeSpace {
  export interface IState {}

  export interface IProps extends RouteComponentProps<any> {
    swipeActions: ISwipeActions;
    swipe: ISwipeState;
    profile?: any;
  }
}
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  spacing: {
    marginTop: 30,
  },
});

export class Swipe extends Component<
  SwipeSpace.IProps & WithStyles<typeof styles>,
  SwipeSpace.IState
> {
  state: SwipeSpace.IState = {};

  componentDidMount(): void {
    this.props.swipeActions.loading.REQUEST({});
  }

  onResetSelect = () => {
    this.props.swipeActions.resetSelected.REQUEST({});
  }

  onSelectSwipe = (swipe: ISwipe) => () => {
    this.props.swipeActions.selectSwipe.REQUEST({ selectedSwipe: swipe });
  }

  onSelectSubject = (subject: IEmail) => () => {
    this.props.swipeActions.selectSubject.REQUEST({ selectedSubject: subject });
  }

  toItem = (title: string, onClick: () => void) => {
    return (
      <div key={title}>
        <ListItem button onClick={onClick}>
          <ListItemText primary={title} />
          <KeyboardArrowRight />
        </ListItem>
        <Divider />
      </div>
    );
  }

  onMoveSwipeInEmail = (selectedSwipe: ISwipe) => () => {
    const subjects = selectedSwipe.subjects.map(subject => ({
      ...subject,
      id: null,
      description: `${selectedSwipe.title} > ${subject.title}`,
    }));
    this.props.swipeActions.moveSwipeInEmail.REQUEST({ emails: subjects });
  }

  render() {
    const user = this.props.profile.auth.user;

    // TODO make it APP_DOMAIN constant
    const url = 'http://app.emailmuse.com/r/' + user.id;

    return (
      <Fade in timeout={500}>
        <Paper style={{ padding: 30 }}>
          <Typography
            variant='headline'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            Swipe Vault: <b>Locked</b>
            <Lock style={{ color: 'rgba(0, 0, 0, 0.54)', marginLeft: 10 }} />
          </Typography>
          <Typography
            variant='subheading'
            className={this.props.classes.spacing}
          >
            Unlock the Swipe Vault by sharing EmailMuse with your friends on
            Facebook or Twitter.
          </Typography>
          <Input
            id='site'
            value={url}
            disableUnderline
            fullWidth
            style={{
              border: '1px solid #f1f1f1',
              paddingLeft: 10,
              paddingRight: 10,
            }}
            className={this.props.classes.spacing}
          />
          <Typography
            variant='subheading'
            className={this.props.classes.spacing}
          >
            Share on
            <span style={{ textDecoration: 'underline' }}> Facebook</span>,
            <span style={{ textDecoration: 'underline' }}> Twitter</span>,
            email, mobile or however you want.
          </Typography>
          <Typography
            variant='subheading'
            className={this.props.classes.spacing}
          >
            When just one new person downloads EmailMuse (which is free for
            them) you will get instant access to the Swipe Vault.
          </Typography>
        </Paper>
      </Fade>
    );

    const {
      selectedSwipe,
      selectedSubject,
      swipes,
      isLoading,
    } = this.props.swipe;
    const { classes } = this.props;

    if (isLoading) {
      return <Loading />;
    }

    const items = [
      {
        title: 'Email Swipes Vault',
        onClick: this.onResetSelect,
      },
    ];

    if (selectedSwipe) {
      items.push({
        title: selectedSwipe.title,
        onClick: this.onSelectSubject(null),
      });
    }

    if (selectedSubject) {
      items.push({
        title: selectedSubject.title,
        onClick: () => null,
      });
    }

    return (
      <Paper className={b()} style={selectedSubject && { height: 'auto' }}>
        <Breadcrumbs items={items} />
        {(selectedSubject && (
          <PreviewMail mail={selectedSubject} swipe={selectedSwipe} />
        )) || (
          <Fade in timeout={500}>
            <List component='nav' className={classNamesSwipe.SWIPE_BODY}>
              {(selectedSwipe &&
                selectedSwipe.subjects.map(subject =>
                  this.toItem(subject.title, this.onSelectSubject(subject)),
                )) ||
                swipes.map(swipe =>
                  this.toItem(swipe.title, this.onSelectSwipe(swipe)),
                )}
            </List>
          </Fade>
        )}
        {selectedSwipe &&
          !selectedSubject && (
            <Fab
              onClick={this.onMoveSwipeInEmail(selectedSwipe)}
              title={'Use These Emails'}
              position={0}
              variant='contained'
              color='primary'
              key={'Enter'}
              bottom={'30px'}
              className={classes.button}
            >
              Use These Emails <Check className={classes.rightIcon} />
            </Fab>
          )}
      </Paper>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  swipe: state.swipe,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  swipeActions: bindModuleAction(SwipeActions, dispatch),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Swipe),
);
