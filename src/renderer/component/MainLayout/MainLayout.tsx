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
import { Snippets } from 'src/renderer/component/Snippets/Snippets';
import Swipe from 'src/renderer/component/Swipe/Swipe';
import ImageLibrary from 'src/renderer/component/ImageLibrary/ImageLibrary';
import Layouts from 'src/renderer/component/Layouts/Layouts';
import Account from 'src/renderer/component/Profile/Account/Account';
import Templates from 'src/renderer/component/Templates/Templates';
import Editor from 'src/renderer/component/Editor/Editor';

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
            <Route path='/' component={Menu}/>
          </Grid>
          <Grid item xs={12} sm={9} style={{ overflowY: 'auto', overflowX: 'hidden' }}>
            <Route path='/emails' component={Templates}/>
            <Route path='/layouts' component={Layouts}/>
            <Route path='/image-library' component={ImageLibrary}/>
            <Route path='/snippets' component={Snippets}/>
            <Route path='/swipe' component={Swipe}/>
            <Route path='/account' component={Account}/>
            <Route path='/editor' component={Editor}/>
            {/*<PreloaderLayout/>*/}
            <ModalProvider/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MainLayout);
