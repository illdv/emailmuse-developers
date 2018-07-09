import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Divider, Fade, Grid, Typography } from '@material-ui/core';

import { ISwipe } from 'src/renderer/component/Swipe/flux/interface';
import { Fab } from 'src/renderer/common/Fab';
import { Edit } from '@material-ui/icons';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { IDrawerMenuActions } from 'src/renderer/component/Menu/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { bindActionCreators } from 'redux';
import { ISwipeActions, SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';

export namespace PreviewMailSpace {
  export interface IState {

  }

  export interface IProps {
    mail: ITemplate;
    swipe: ISwipe;
    swipeActions?: ISwipeActions;
    drawerMenuAction?: IDrawerMenuActions;
  }
}

class PreviewMail extends Component<PreviewMailSpace.IProps, PreviewMailSpace.IState> {

  state: PreviewMailSpace.IState = {};

  onAddInLayout = () => {
    const { swipeActions, swipe, mail } = this.props;
    swipeActions.moveSubjectInEmail.REQUEST({
      email: {
        ...mail,
        description: `${swipe.title} > ${mail.title}`,
      },
    });
  }

  render() {
    const { mail } = this.props;

    return (
      <div>
        <Fade in timeout={1000}>
          <div>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant='headline'
                  noWrap
                >
                  {mail.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider/>
                <div dangerouslySetInnerHTML={{ __html: mail.body }}/>
              </Grid>
            </Grid>
          </div>
        </Fade>
        <Fab
          color={'secondary'}
          onClick={this.onAddInLayout}
          icon={<Edit/>}
          position={0}
          title={'Use This Email'}
          key={'Enter'}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  swipeActions: bindModuleAction(SwipeActions, dispatch),
  drawerMenuAction: bindActionCreators(DrawerMenuAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewMail);
