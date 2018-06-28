import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Divider, Fade, Grid, Typography } from '@material-ui/core';

import { ISubject } from 'src/renderer/component/Swipe/flux/interface';
import { Fab } from 'src/renderer/common/Fab';
import { Edit } from '@material-ui/icons';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { bindModuleAction } from 'src/renderer/utils';
import { ISwipeActions, SwipeActions } from 'src/renderer/component/Swipe/flux/actions';

export namespace PreviewMailSpace {
  export interface IState {

  }

  export interface IProps {
    mail: ISubject;
    swipeActions?: ISwipeActions;
  }
}

class PreviewMail extends Component<PreviewMailSpace.IProps, PreviewMailSpace.IState> {

  state: PreviewMailSpace.IState = {};

  onAddInLayout = () => {
    const { swipeActions, mail } = this.props;
    swipeActions.moveInEmail.REQUEST({ id: '1' });
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewMail);
