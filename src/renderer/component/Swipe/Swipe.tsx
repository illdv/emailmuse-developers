import * as React from 'react';
import { Component } from 'react';
import { Check, KeyboardArrowRight, Lock } from '@material-ui/icons';
import { Grid, TextField, Typography } from '@material-ui/core';
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
import { ISwipeActions, SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { RouteComponentProps } from 'react-router-dom';
import { ISwipeState } from 'src/renderer/component/Swipe/flux/reducer';

import './Swipe.scss';
import { Loading } from 'src/renderer/common/Loading';
import { Fab } from 'src/renderer/common/Fab';
import { classNamesSwipe } from 'src/renderer/component/Tutorial/steps/swipe';

const b = block('swipe');

export namespace SwipeSpace {
  export interface IState {
  }

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
});

export class Swipe extends Component<SwipeSpace.IProps & WithStyles<any>, SwipeSpace.IState> {
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
          <ListItemText primary={title}/>
          <KeyboardArrowRight/>
        </ListItem>
        <Divider/>
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

    if (user.is_swipe_locked) {
      // TODO make it APP_DOMAIN constant
      const url = 'http://app.emailmuse.com/r/' + user.id;

      return (
          <Fade in timeout={1000}>
              <div className={this.props.classes.container}>
                  <Paper className={`${this.props.classes.root}`}>
                      <Grid container spacing={24}>
                          <Grid item xs={12}>
                              <Typography variant='headline' noWrap align='left'>
                                  Swipe Vault: Locked
                                  <Lock />
                              </Typography>
                          </Grid>

                          <Grid item xs={12}>
                              Unlock the Swipe Vault by sharing EmailMuse with your
                              friends on Facebook or Twitter
                          </Grid>

                          <Grid item xs={12}>
                              <TextField id='site' value={ url } margin='normal'/>
                          </Grid>

                          <Grid item xs={12}>
                              Share on Facebook, Twitter, email, mobile or however you want.
                          </Grid>

                          <Grid item xs={12}>
                              When just one new person downloads EmailMuse (which is free for them)
                              you will get instant access to the Swipe Vault
                          </Grid>
                      </Grid>
                  </Paper>
              </div>
          </Fade>
        );
    }

    const { selectedSwipe, selectedSubject, swipes, isLoading } = this.props.swipe;
    const { classes } = this.props;

    if (isLoading) {
      return <Loading/>;
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
        <Breadcrumbs
          items={items}
        />
        {
          selectedSubject
          &&
          <PreviewMail mail={selectedSubject} swipe={selectedSwipe}/>
          ||
          <Fade in timeout={500}>
            <List component='nav' className={classNamesSwipe.SWIPE_BODY}>
              {
                selectedSwipe
                &&
                selectedSwipe.subjects.map(subject => this.toItem(subject.title, this.onSelectSubject(subject)))
                ||
                swipes.map(swipe => this.toItem(swipe.title, this.onSelectSwipe(swipe)))
              }
            </List>
          </Fade>
        }
        {
          selectedSwipe && !selectedSubject &&
          <Fab
            onClick={this.onMoveSwipeInEmail(selectedSwipe)}
            title={'Use These Emails'}
            position={0}
            variant='contained'
            color='primary'
            key={'Enter'}
            bottom={'30px'}
            className={classes.button}
          >Use These Emails <Check className={classes.rightIcon}/>
          </Fab>
        }
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

export default withStyles(styles)
(connect(mapStateToProps, mapDispatchToProps)
(Swipe));
