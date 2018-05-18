import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Divider, Grid, List, ListItem, Paper, Typography, withStyles } from '@material-ui/core/';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { LabelsType, IMailView } from 'src/renderer/component/MailList/flux/saga/selectors';
import { extractTime, filterVisibilityLabel, sortSelectedMail } from 'src/renderer/component/MailList/utils';
import { FluxMail, SelectedType } from 'src/renderer/component/MailList/flux/action';
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
    mail?: FluxMail.IState;
    drawerMenu?: FluxDrawerMenu.IActions;
    classes?: any;
    onLoadingMail?: () => void;
    visibilityLabel?: LabelsType;
    onSelectMail?: (selectedMailId: string) => void;
  }

  export interface IState {
    /*...*/
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  mail: state.mail,
  drawerMenu: state.drawerMenu,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onLoadingMail: () => {
    dispatch(FluxMail.Actions.onLoadingMail.REQUEST());
  },
  onSelectMail: (selectedMailId: string) => {
    dispatch(FluxMail.Actions.onSelectMail(selectedMailId, SelectedType.VIEW));
  }
});

@(connect(mapStateToProps, mapDispatchToProps))
class MailList extends React.Component<MailListSpace.IProps, MailListSpace.IState> {

  constructor(props: MailListSpace.IProps, context?: object) {
    super(props, context);
  }

  onSelectMail = (mail: IMailView) => () => {
    this.props.onSelectMail(mail.id);
  }

  render() {
    const { mailViews, visibilityLabel } = this.props.mail;

    const sortingMails = sortSelectedMail(filterVisibilityLabel(mailViews, visibilityLabel));

    const { classes } = this.props;
    return (
      <Paper elevation={4} className={classes.root}>
        <div className={classes.root}>
          <List component="nav">
            {sortingMails && sortingMails.map((email, index) => (
              <div key={email.id} onClick={this.onSelectMail(email)}>
                <ListItem button>
                  <Grid container spacing={24}>
                    <Grid item xs={4}>
                      <Typography gutterBottom noWrap>{email.from || '---'}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography gutterBottom noWrap>{email.subject || '---'}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align={'right'} gutterBottom noWrap>{extractTime(email.time || '---')}</Typography>
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
