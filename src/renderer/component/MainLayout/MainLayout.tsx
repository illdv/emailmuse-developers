import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid, WithStyles, withStyles } from '@material-ui/core/';
import { IStyle } from 'type/materialUI';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Route } from 'react-router-dom';

import Menu from 'src/renderer/component/Menu/Menu';
import { PreloaderLayout } from 'src/renderer/common/PreloaderLayout/PreloaderLayout';
import { IDrawerMenuState } from 'src/renderer/component/Menu/flux/interface';

import ModalProvider from 'src/renderer/common/ModalWindow/ModalProvider';
import MainScreen from 'src/renderer/component/MainLayout/MainScreen';

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

  }

  export interface IProps {
    drawerMenu?: IDrawerMenuState;
  }
}

@DragDropContext(HTML5Backend)
class MainLayout extends Component<MainLayoutSpace.IProps & WithStyles<any>, MainLayoutSpace.IState> {

  state = {};

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={8} className={classes.grid}>
          <Grid item xs={12} sm={3}>
            <Menu/>
          </Grid>
          <Grid item xs={12} sm={9} style={{ overflowY: 'auto', overflowX: 'hidden' }}>
            <PreloaderLayout/>
            <ModalProvider/>
            <MainScreen />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MainLayout);
