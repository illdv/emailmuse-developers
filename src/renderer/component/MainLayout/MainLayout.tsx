import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid, WithStyles, withStyles } from '@material-ui/core/';
import { IStyle } from 'type/materialUI';
// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContext } from 'react-dnd';
import { Route, Switch, Redirect } from 'react-router-dom';

import Menu from 'src/renderer/component/Menu';
import { IDrawerMenuState } from 'src/renderer/component/Menu/flux/interface';

import ModalProvider from 'src/renderer/common/DialogProvider/ModalProvider';
import { Snippets } from 'src/renderer/component/Snippets/Snippets';
import Swipe from 'src/renderer/component/Swipe/Swipe';
import SwipeLocked from 'src/renderer/component/Swipe/SwipeLocked';

import ImageLibrary from 'src/renderer/component/ImageLibrary/ImageLibrary';
import Layouts from 'src/renderer/component/Layouts/Layouts';
import Account from 'src/renderer/component/Profile/Account/Account';
import Emails from 'src/renderer/component/Emails/Emails';
import Editor from 'src/renderer/component/Editor/Editor';
import StepsSelection from 'src/renderer/component/Training/StepsSelection';
import DragDropContext from 'src/renderer/DragDropContext';
import Help from 'src/renderer/component/Help';
import Tour from '../Tutorial/Tour';
import GreatJob from '../GreatJob';
import { isFirstTime, onRestTour } from 'src/renderer/common/isFirstTime';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { getSnippetsFromState } from 'src/renderer/selectors';
import { ISnippet } from '../Snippets/flux/interfaceAPI';
import { SnippetsAction, ISnippetsAction } from '../Snippets/flux/actions';
import { bindActionCreators } from 'redux';

const styles: IStyle = {
  root: {
    flexGrow: 1,
    height: '100%',
    padding: 5,
  },
  row: {
    textAlign: 'center',
  },
  grid: {
    height: '100%',
  },
};

export namespace MainLayoutSpace {
  export interface IState {
    firstTime: boolean;
  }

  export interface IProps {
    snippets: ISnippet[];
    actions: ISnippetsAction;
    drawerMenu?: IDrawerMenuState;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  snippets: getSnippetsFromState(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: {
    loading: bindActionCreators(SnippetsAction.loading, dispatch),
  },
});

@DragDropContext
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class MainLayout extends Component<
  MainLayoutSpace.IProps & WithStyles<any>,
  MainLayoutSpace.IState
> {
  state = {
    firstTime: onRestTour(),
  };
  componentDidMount() {
    this.props.actions.loading.REQUEST({});
    this.checkFirstTime();
    this.setState({
      firstTime: onRestTour(),
    });
  }

  checkFirstTime = () => {
    if (!localStorage.getItem('ResTour')) {
      localStorage.setItem('ResTour', 'yes');
    } else {
      localStorage.setItem('ResTour', 'no');
    }
    if (!localStorage.getItem('FirstTime')) {
      localStorage.setItem('FirstTime', JSON.stringify({ yes: 0 }));
    }
  };

  onRedirectFirstTime = ({ match }) =>
    this.state.firstTime &&
    this.props.snippets &&
    !this.props.snippets.length ? (
      <Redirect to='/snippets' />
    ) : (
      <Emails match={match} />
    );

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Tour firstTime={this.state.firstTime} />
        <Grid container spacing={8} className={classes.grid}>
          <Grid item xs={12} sm={3}>
            <Route path='/' component={Menu} />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Switch>
              <Route path='/emails/:id/:name' component={Emails} />
              <Route path='/emails' render={this.onRedirectFirstTime} />
            </Switch>
            <Route path='/layouts' component={Layouts} />
            <Route path='/greatJob' component={GreatJob} />
            <Route path='/image-library' component={ImageLibrary} />
            <Route path='/snippets' component={Snippets} />
            <Route path='/swipes' component={Swipe} />
            <Route path='/swipes-locked' component={SwipeLocked} />
            <Route path='/account' component={Account} />
            <Route path='/help' component={Help} />
            <Route path='/editor' component={Editor} />
            <Route path='/training' component={StepsSelection} />
            <ModalProvider />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MainLayout);
