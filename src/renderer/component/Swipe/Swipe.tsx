import * as React from 'react';
import { Component } from 'react';
import { Check, KeyboardArrowRight } from '@material-ui/icons';
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

import { Loading } from 'src/renderer/common/Loading';
import { Fab } from 'src/renderer/common/Fab';
import { classNamesSwipe } from 'src/renderer/component/Tutorial/steps/swipes';
import SwipeLocked from './SwipeLocked';
import { IProfileState } from '../Profile/flux/models';

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
    const AppDomain = process.env.APP_DOMAIN;

    const user = this.props.profile.auth.user;
    const url = AppDomain + '/r/' + user.id;
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
      <Paper classes={{ root: classes.wrapper }}>
        <Fade in timeout={500}>
          {isLocked ? (
            <SwipeLocked url={url} swipeActions={this.props.swipeActions} />
          ) : (
            <>
              <Breadcrumbs items={items} />
              {(selectedSubject && (
                <PreviewMail mail={selectedSubject} swipe={selectedSwipe} />
              )) || (
                <List component='nav' className={classNamesSwipe.SWIPE_BODY}>
                  {(selectedSwipe &&
                    selectedSwipe.subjects.map(
                      subject =>
                        !subject.is_locked &&
                        this.toItem(
                          subject.title,
                          this.onSelectSubject(subject),
                        ),
                    )) ||
                    swipes.map(
                      swipe =>
                        !swipe.is_locked &&
                        this.toItem(swipe.title, this.onSelectSwipe(swipe)),
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
            </>
          )}
        </Fade>
      </Paper>
    );
  }
}

const styles = ({ spacing }) => {
  return {
    rightIcon: {
      marginLeft: spacing.unit,
    },
    wrapper: {
      padding: 30,
      height: '100%',
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
