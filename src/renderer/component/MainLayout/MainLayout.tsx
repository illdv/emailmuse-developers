import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid, WithStyles, withStyles } from '@material-ui/core/';
import { Bookmark} from '@material-ui/icons';
import { IStyle } from 'type/materialUI';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { FluxDrawerMenu, MenuItemType } from 'src/renderer/component/Menu/flux/action';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import Menu from 'src/renderer/component/Menu/Menu';
import ImageLibrary from 'src/renderer/component/ImageLibrary/ImageLibrary';
import Settings from '../Account/Settings';
import Templates from '../Templates/TemplatesRouter';
import { PreloaderLayout } from 'src/renderer/component/PreloaderLayout/PreloaderLayout';

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
    drawerMenu?: FluxDrawerMenu.IState;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  drawerMenu: state.drawerMenu,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  /*
    onLoadingMail: () => {
     dispatch(Mail.Actions.onLoadingMail.REQUEST());
   },
  */
});
@DragDropContext(HTML5Backend)
@(connect(mapStateToProps, mapDispatchToProps))
class MainLayout extends Component<MainLayoutSpace.IProps & WithStyles<any>, MainLayoutSpace.IState> {

  state = {};

  mainDisplay = (props: MainLayoutSpace.IProps) => {
    switch (props.drawerMenu.selectedItem) {
      case MenuItemType.ACCOUNT:
        return <Settings/>;
      case MenuItemType.TEMPLATES:
        return <Templates/>;
      case MenuItemType.IMAGE_LIBRARY:
        return <ImageLibrary/>;
      default:
        return <Settings/>;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={8} className={classes.grid}>
          <Grid item xs={12} sm={3}>
            {<Menu/>}
          </Grid>
          <Grid item xs={12} sm={9} style={{ overflow: 'auto', position: 'relative' }}>
            <PreloaderLayout/>
            {this.mainDisplay(this.props)}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MainLayout);
