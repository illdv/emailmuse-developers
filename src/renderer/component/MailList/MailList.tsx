import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Divider, Grid, List, ListItem, Paper, Typography, withStyles } from '@material-ui/core/';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { FluxDrawerMenu } from 'src/renderer/component/Menu/flux/action';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  }
});

export namespace MailListSpace {
  export interface IProps {
    drawerMenu?: FluxDrawerMenu.IActions;
    classes?: any;
  }

  export interface IState {
    /*...*/
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  drawerMenu: state.drawerMenu,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
});

@(connect(mapStateToProps, mapDispatchToProps))
class MailList extends React.Component<MailListSpace.IProps, MailListSpace.IState> {

  constructor(props: MailListSpace.IProps, context?: object) {
    super(props, context);
  }

  onSelectMail = () => () => {
    console.log('select mail');
  }

  render() {
    const sortingMails = [];

    const { classes } = this.props;
    return (
      <Paper elevation={4} className={classes.root}>
        <div className={classes.root}>
          <List component="nav">
            {sortingMails && sortingMails.map((email, index) => (
              <div key={email.id} onClick={this.onSelectMail()}>
                <ListItem button>
                  <Grid container spacing={24}>
                    <Grid item xs={4}>
                      <Typography gutterBottom noWrap>{email.from || '---'}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography gutterBottom noWrap>{email.subject || '---'}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align={'right'} gutterBottom noWrap>{email.time}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {index !== sortingMails.length - 1 && <Divider/>}
              </div>
            ))}
          </List>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(MailList as any);
