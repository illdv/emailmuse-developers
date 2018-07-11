import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Divider, Fade, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { KeyboardArrowRight } from '@material-ui/icons';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { Breadcrumbs, IBreadcrumbs } from 'src/renderer/common/Breadcrumbs/Breadcrumbs';

import data from './Data';
import InCenter from 'src/renderer/common/InCenter';

export namespace StepsSelectionSpace {
  export interface IState {

  }

  export interface IProps extends RouteComponentProps<any> {

  }
}

interface IItems {
  id: number;
  title: string;
}

class StepsSelection extends Component<StepsSelectionSpace.IProps, StepsSelectionSpace.IState> {

  state: StepsSelectionSpace.IState = {};

  toItem = (props: RouteComponentProps<any>) => (item: IItems) => {
    return (
      <div key={item.title}>
        <ListItem button onClick={this.onSelectItem(item, props)}>
          <ListItemText primary={item.title}/>
          <KeyboardArrowRight/>
        </ListItem>
        <Divider/>
      </div>
    );
  }

  onSelectItem = (item: IItems, props: RouteComponentProps<any>) => () => {
    const { history, match } = props;
    history.push(`${match.url}/${item.id}`);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/training' render={this.renderStep}/>
        <Route exact path='/training/:stepOne' render={this.renderStep}/>
        <Route exact path='/training/:stepOne/:stepTwo' render={this.renderStep}/>
        <Route exact path='/training/:stepOne/:stepTwo/:stepThree' render={this.renderStep}/>
      </Switch>
    );
  }

  renderStep = (props: RouteComponentProps<any>) => {
    const breadcrumb: IBreadcrumbs[] = [];

    const { stepOne, stepTwo, stepThree } = props.match.params;

    breadcrumb.push({
      title: 'Training',
      onClick: () => props.history.push(`/training`),
    });

    if (stepOne) {
      breadcrumb.push({
        title: data[stepOne].title,
        onClick: () => props.history.push(`/training/${stepOne}`),
      });
    }
    if (stepTwo) {
      breadcrumb.push({
        title: data[stepOne].items[stepTwo].title,
        onClick: () => props.history.push(`/training/${stepOne}/${stepTwo}`),
      });
    }
    if (stepThree) {
      breadcrumb.push({
        title: '3',
        onClick: () => props.history.push(`/training/${stepOne}/${stepTwo}/${stepThree}`),
      });
    }

    let items: IItems[] = data.map((item, index): IItems => ({ title: item.title, id: index }));

    if (stepThree) {
      items = [];
    } else if (stepTwo) {
      const itemTraining = data[stepOne].items[stepTwo].item;

      const onBack = () => {
        props.history.push(`/training/${stepOne}`);
      };

      const hasNextItem = data[stepOne].items[+stepTwo + 1];
      const hasNextStep = data[+stepOne + 1];

      const onNext = () => {
        if (hasNextItem) {
          props.history.push(`/training/${stepOne}/${+stepTwo + 1}`);
        } else {
          if (hasNextStep) {
            props.history.push(`/training/${+stepOne + 1}/${0}`);
          }
        }
      };

      return (

        <div>
          <Paper style={{ padding: 30, height: 'auto' }}>
            <Breadcrumbs items={breadcrumb}/>
            <Fade in timeout={500}>
              <div>
                <div style={{ paddingLeft: 15 }}>
                  <Typography variant='headline' noWrap>
                    {itemTraining.title}
                  </Typography>
                  <Typography variant='title' noWrap>
                    {itemTraining.description}
                  </Typography>
                </div>
                <InCenter>
                  <div style={{ paddingTop: 15 }} dangerouslySetInnerHTML={{ __html: itemTraining.video_code }}/>
                </InCenter>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button color='primary' onClick={onBack}>
                    {'< Back'}
                  </Button>
                  {
                    (hasNextItem || hasNextStep) &&
                    <Button color='primary' onClick={onNext}>
                      Next >
                    </Button>
                  }
                </div>
              </div>
            </Fade>
          </Paper>
        </div>
      );
    } else if (stepOne) {
      items = data[stepOne].items.map((item, index): IItems => ({ title: item.title, id: index }));
    }

    return (
      <div>
        <Paper style={{ padding: 30, height: 'auto' }}>
          <Breadcrumbs items={breadcrumb}/>
          <Fade in timeout={500}>
            <List component='nav'>
              {items.map(this.toItem(props))}
            </List>
          </Fade>
        </Paper>
      </div>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(StepsSelection);
