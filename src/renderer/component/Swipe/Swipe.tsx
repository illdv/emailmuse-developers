import * as React from 'react';
import { Component } from 'react';
import { Edit, KeyboardArrowRight } from '@material-ui/icons';
import { connect, Dispatch } from 'react-redux';
import { Divider, Fade, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import block from 'bem-ts';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ISwipe } from 'src/renderer/component/Swipe/flux/interface';

import './Swipe.scss';
import data from './Data';
import { Breadcrumbs } from 'src/renderer/common/Breadcrumbs/Breadcrumbs';
import PreviewMail from 'src/renderer/component/Swipe/PreviewMail';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { ISwipeActions, SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { Fab } from 'src/renderer/common/Fab';

const b = block('swipe');

export namespace SwipeSpace {
  export interface IState {
    selectedSwipe: ISwipe;
    selectedSubject: ITemplate;
  }

  export interface IProps {
    swipeActions: ISwipeActions;
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

  onSelectSubject = (subject: ITemplate) => () => {
    this.setState({
      selectedSubject: subject,
    });
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
      description: `${selectedSwipe.title} > ${subject.title}`,
    }));
    this.props.swipeActions.moveSwipeInEmail.REQUEST({ emails: subjects });
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
      <div>
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
        </Paper>
        {
          selectedSwipe && !selectedSubject &&
          <Fab
            onClick={this.onMoveSwipeInEmail(selectedSwipe)}
            icon={<Edit/>}
            position={0}
            title={'Use These Emails'}
            key={'Enter'}
            color={'secondary'}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  /// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  swipeActions: bindModuleAction(SwipeActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Swipe);
