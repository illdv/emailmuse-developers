import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Divider, Fade, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { KeyboardArrowRight } from '@material-ui/icons';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { Breadcrumbs, IBreadcrumbs } from 'src/renderer/common/Breadcrumbs/Breadcrumbs';

import InCenter from 'src/renderer/common/InCenter';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { ITrainingActions, TrainingActions } from 'src/renderer/component/Training/flux/actions';
import { ITrainingState } from 'src/renderer/component/Training/flux/reducer';
import { Loading } from 'src/renderer/common/Loading';

export namespace StepsSelectionSpace {
  export interface IState {

  }

  export interface IProps extends RouteComponentProps<any> {
    trainingActions?: ITrainingActions;
    training?: ITrainingState;
  }
}

interface IItems {
  id: number;
  title: string;
}

class StepsSelection extends Component<StepsSelectionSpace.IProps, StepsSelectionSpace.IState> {

  state: StepsSelectionSpace.IState = {};

  componentDidMount(): void {
    this.props.trainingActions.loading.REQUEST({});
  }

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
    const { isLoading } = this.props.training;
    if (isLoading) {
      return <Loading/>;
    }

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

    const { training } = this.props.training;

    const { stepOne, stepTwo, stepThree } = props.match.params;

    breadcrumb.push({
      title: 'Training',
      onClick: () => props.history.push(`/training`),
    });

    if (stepOne) {
      breadcrumb.push({
        title: training[stepOne].title,
        onClick: () => props.history.push(`/training/${stepOne}`),
      });
    }
    if (stepTwo) {
      breadcrumb.push({
        title: training[stepOne].items[stepTwo].title,
        onClick: () => props.history.push(`/training/${stepOne}/${stepTwo}`),
      });
    }
    if (stepThree) {
      breadcrumb.push({
        title: '3',
        onClick: () => props.history.push(`/training/${stepOne}/${stepTwo}/${stepThree}`),
      });
    }

    let items: IItems[] = training.map((item, index): IItems => ({ title: item.title, id: index }));

    if (stepThree) {
      items = [];
    } else if (stepTwo) {
      const itemTraining = training[stepOne].items[stepTwo].item;

      const onBack = () => {
        props.history.push(`/training/${stepOne}`);
      };

      const hasNextItem = training[stepOne].items[+stepTwo + 1];
      const hasNextStep = training[+stepOne + 1];

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
      items = training[stepOne].items.map((item, index): IItems => ({ title: item.title, id: index }));
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
  training: state.training,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  trainingActions: bindModuleAction(TrainingActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepsSelection);
