import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Divider, Fade, Grid, Typography, WithStyles, withStyles } from '@material-ui/core';
import { Check, Edit } from '@material-ui/icons';

import { ISwipe } from 'src/renderer/component/Swipe/flux/interface';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { IDrawerMenuActions } from 'src/renderer/component/Menu/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { bindActionCreators } from 'redux';
import { ISwipeActions, SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { Fab } from 'src/renderer/common/Fab';

const styles = ({
  button: {
    margin: 10,
  },
  rightIcon: {
    marginLeft: 5,
  },
  buttonBlock: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});
export namespace PreviewMailSpace {
  export interface IState {
  }
  export interface IProps {
    mail: IEmail;
    swipe: ISwipe;
    swipeActions?: ISwipeActions;
    drawerMenuAction?: IDrawerMenuActions;
  }
}

class PreviewMail extends Component<PreviewMailSpace.IProps, PreviewMailSpace.IState> {
  state: PreviewMailSpace.IState = {};

  onMoveSubjectInEmail = () => {
    const { swipeActions, swipe, mail } = this.props;
    swipeActions.moveSubjectInEmail.REQUEST({
      email: {
        ...mail,
        id: null,
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
                >{mail.description}
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
          onClick={this.onMoveSubjectInEmail}
          title={'Use These Email'}
          position={0}
          variant='contained'
          color='primary'
          key={'Enter'}
          bottom={'30px'}
        >Use This Email <Check style={{ ...styles.rightIcon }}/>
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  swipeActions: bindModuleAction(SwipeActions, dispatch),
  drawerMenuAction: bindActionCreators(DrawerMenuAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)
(PreviewMail);
