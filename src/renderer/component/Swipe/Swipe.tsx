import * as React from 'react';
import { Component } from 'react';
import { KeyboardArrowRight } from '@material-ui/icons';
import { connect, Dispatch } from 'react-redux';
import { Divider, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import block from 'bem-ts';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ISubject, ISwipe } from 'src/renderer/component/Swipe/flux/interface';

import './Swipe.scss';
import data from './Data';

const b = block('swipe');

export namespace SwipeSpace {
  export interface IState {
    selectedSwipe: ISwipe;
    selectedSubject: ISubject;
  }

  export interface IProps {

  }
}

export class Swipe extends Component<SwipeSpace.IProps, SwipeSpace.IState> {

  state: SwipeSpace.IState = {
    selectedSwipe: null,
    selectedSubject: null,
  };

  onSelectSwipe = (swipe: ISwipe) => () => {
    this.setState({
      selectedSwipe: swipe,
    });
  }

  onSelectSubject = (subject: ISubject) => () => {
    this.setState({
      selectedSubject: subject,
    });
  }

  toItem = (title: string, onClick: () => void) => {
    return (
      <>
        <ListItem button onClick={onClick}>
          <ListItemText primary={title}/>
          <KeyboardArrowRight/>
        </ListItem>
        <Divider/>
      </>
    );
  }

  render() {
    const swipes: ISwipe[] = data as any;

    const { selectedSwipe, selectedSubject } = this.state;

    const items = [
      {
        title: 'Swipe',
        onClick: () => this.setState({
          selectedSwipe: null,
          selectedSubject: null,
        }),
      },
    ];

    if (selectedSwipe) {
      items.push({
        title: selectedSwipe.title,
        onClick: () => this.setState({
          selectedSubject: null,
        }),
      });
    }

    if (selectedSubject) {
      items.push({ title: selectedSubject.title, onClick: () => null });
    }

    return (
      <Paper className={b()}>
        <Breadcrumbs
          items={items}
        />
        {
          selectedSubject
          &&
          <div dangerouslySetInnerHTML={{ __html: selectedSubject.body }}/>
          ||
          <List component='nav'>
            {
              selectedSwipe
              &&
              selectedSwipe.subjects.map(subject => this.toItem(subject.title, this.onSelectSubject(subject)))
              ||
              swipes.map(swipe => this.toItem(swipe.title, this.onSelectSwipe(swipe)))
            }
          </List>
        }
      </Paper>
    );
  }
}

// TODO: move in common
interface IBreadcrumbs {
  title: string;
  onClick: () => void;
}

function Breadcrumbs({ items }: { items: IBreadcrumbs[] }) {
  const separator = ' > ';
  return (
    <Typography variant='headline' noWrap style={{ padding: 24 }}>
      <>
        {
          items.map((item, index) => (
            <span onClick={item.onClick}>
              {index !== 0 && separator}
              {item.title}
            </span>
          ))
        }
      </>
    </Typography>
  );
}

const mapStateToProps = (state: IGlobalState) => ({
  /// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  /*
    onLoadingMail: () => {
     dispatch(Mail.Actions.onLoadingMail.REQUEST());
   },
  */
});

export default connect(mapStateToProps, mapDispatchToProps)(Swipe);
