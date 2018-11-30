import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid, WithStyles, withStyles } from '@material-ui/core/';
import { IStyle } from 'type/materialUI';
// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContext } from 'react-dnd';
import { Route, Switch } from 'react-router-dom';

import Menu from 'src/renderer/component/Menu/Menu';
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
  export interface IState {}

  export interface IProps {
    drawerMenu?: IDrawerMenuState;
  }
}
@DragDropContext
class MainLayout extends Component<
  MainLayoutSpace.IProps & WithStyles<any>,
  MainLayoutSpace.IState
> {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={8} className={classes.grid}>
          <Grid item xs={12} sm={3}>
            <Route path='/' component={Menu} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            style={{ overflowY: 'auto', overflowX: 'hidden' }}
          >
            <Switch>
              <Route path='/emails/:id/:name' component={Emails} />
              <Route path='/emails' component={Emails} />
            </Switch>
            <Route path='/layouts' component={Layouts} />
            <Route path='/image-library' component={ImageLibrary} />
            <Route path='/snippets' component={Snippets} />
            <Route path='/swipes' component={Swipe} />
            <Route path='/swipes-locked' component={SwipeLocked} />
            <Route path='/account' component={Account} />
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
