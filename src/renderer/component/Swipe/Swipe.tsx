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

const b = block('swipe');

export namespace SwipeSpace {
  export interface IState {
  }

  export interface IProps extends RouteComponentProps<any> {
    swipeActions: ISwipeActions;
    swipe: ISwipeState;
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

    const { selectedSwipe, selectedSubject, swipes, isLoading } = this.props.swipe;
    const { classes } = this.props;

    if (isLoading) {
      return <Loading/>;
    }

    const items = [
      {
        title: 'Swipes',
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
            <List component='nav'>
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
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  swipeActions: bindModuleAction(SwipeActions, dispatch),
});

export default withStyles(styles)
(connect(mapStateToProps, mapDispatchToProps)
(Swipe));
