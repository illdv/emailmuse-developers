import * as React from 'react';
import { Component, Fragment } from 'react';
import { Check, KeyboardArrowRight, Lock } from '@material-ui/icons';
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
  Theme,
} from '@material-ui/core';
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
import { RouteComponentProps, Link } from 'react-router-dom';
import { ISwipeState } from 'src/renderer/component/Swipe/flux/reducer';

import { Loading } from 'src/renderer/common/Loading';
import { Fab } from 'src/renderer/common/Fab';
import { classNamesSwipe } from 'src/renderer/component/Tutorial/steps/swipes';
import SwipeLocked from './SwipeLocked';
import { IProfileState } from '../Profile/flux/models';
import { APP_DOMAIN } from 'src/common/constants';
import { classNamesEmails } from '../Tutorial/steps/emails';

export namespace SwipeSpace {
  export interface IState {}

  export interface IProps extends RouteComponentProps<any> {
    swipeActions: ISwipeActions;
    swipe: ISwipeState;
    profile?: IProfileState;
  }
}

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
  };

  onSelectSwipe = (swipe: ISwipe) => () => {
    this.props.swipeActions.selectSwipe.REQUEST({ selectedSwipe: swipe });
  };

  onSelectSubject = (subject: IEmail) => () => {
    this.props.swipeActions.selectSubject.REQUEST({ selectedSubject: subject });
  };

  toItem = (title: string, onClick: () => void) => {
    return (
      <Fragment key={title}>
        <ListItem button onClick={onClick}>
          <ListItemText primary={title} />
          <KeyboardArrowRight />
        </ListItem>
        <Divider />
      </Fragment>
    );
  };

  toDisabledItem = (title: string, classes) => {
    return (
      <Link to='/swipes-locked' key={title} className={classes.link}>
        <ListItem button>
          <ListItemText primary={title} />
          <Lock />
          <KeyboardArrowRight />
        </ListItem>
        <Divider />
      </Link>
    );
  };

  onMoveSwipeInEmail = (selectedSwipe: ISwipe) => () => {
    const subjects = selectedSwipe.subjects.map(subject => ({
      ...subject,
      id: null,
      description: `${selectedSwipe.title} > ${subject.title}`,
    }));
    this.props.swipeActions.moveSwipeInEmail.REQUEST({ emails: subjects });
  };

  render() {
    const user = this.props.profile.auth.user;
    const url = APP_DOMAIN() + '/r/' + user.id;
    const isLocked = user.is_swipe_locked;
    const {
      selectedSwipe,
      selectedSubject,
      swipes,
      isLoading,
    } = this.props.swipe;
    const { classes } = this.props;

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
    if (isLoading) {
      return <Loading />;
    }

    return (
      <>
        {isLocked ? (
          <SwipeLocked />
        ) : (
          <Fade in timeout={500}>
            <Paper classes={{ root: classes.wrapper }}>
              <Breadcrumbs items={items} />
              {(selectedSubject && (
                <PreviewMail mail={selectedSubject} swipe={selectedSwipe} />
              )) || (
                <List component='nav' className={classNamesSwipe.SWIPE_BODY}>
                  {(selectedSwipe &&
                    selectedSwipe.subjects.map(subject =>
                      !subject.is_locked
                        ? this.toItem(
                            subject.title,
                            this.onSelectSubject(subject),
                          )
                        : this.toDisabledItem(subject.title, classes),
                    )) ||
                    swipes.map(swipe =>
                      !swipe.is_locked
                        ? this.toItem(swipe.title, this.onSelectSwipe(swipe))
                        : this.toDisabledItem(swipe.title, classes),
                    )}
                </List>
              )}
              {selectedSwipe && !selectedSubject && (
                <Fab
                  onClick={this.onMoveSwipeInEmail(selectedSwipe)}
                  title={'Use These Emails'}
                  position={0}
                  variant='contained'
                  color='primary'
                  key={'Enter'}
                  bottom={'30px'}
                >
                  Use These Emails <Check className={classes.rightIcon} />
                </Fab>
              )}
            </Paper>
          </Fade>
        )}
      </>
    );
  }
}

const styles = ({ spacing, palette }: Theme) => {
  return {
    rightIcon: {
      marginLeft: spacing.unit,
    },
    wrapper: {
      padding: 30,
      height: '100%',
    },
    link: {
      textDecoration: 'none',
      color: palette.text.primary,
    },
  };
};

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
