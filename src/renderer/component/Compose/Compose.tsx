/* import { ChangeEvent, Component } from 'react';
import * as React from 'react';
import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  withStyles,
  FormControl,
} from '@material-ui/core/';
import { IStyle } from 'type/materialUI';
import Slide from '@material-ui/core/Slide';
import { Close } from '@material-ui/icons';
import { connect, Dispatch } from 'react-redux';

import MailEdit from 'src/renderer/component/MailEdit/MailEdit';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { FluxMail, SelectedType } from 'src/renderer/component/MailList/flux/action';
import { isMailSelected } from 'src/renderer/component/MailList/utils';
import { findSelectedMail } from 'src/renderer/component/MailEdit/utils';
import { IMailView } from 'src/renderer/component/MailList/flux/saga/selectors';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles: IStyle = () => ({
  main: {
    overflow: 'hidden',
    height: '100%',
  },
  appBar: {
    position: 'relative',
  },
  grid: {
    height: '100%',
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  }
});

export namespace ComposeSpace {
  export interface IState {
    to: string;
    subject: string;
  }

  export interface IProps {
    classes?: any;
    mail?: FluxMail.IState;
    onCloseCompose?: () => void;
    onSetMail: (newMail: IMailView) => void;
    onSendMail: (mailId: string) => () => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  mail: state.mail,
});

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onCloseCompose: () => {
    dispatch(FluxMail.Actions.selectMail(null, SelectedType.COMPOSE));
  },
  onSendMail: (mailId: string) => {
    dispatch(FluxMail.Actions.sendMail.REQUEST(mailId));
  },
  onSetMail: (newMail: IMailView) => {
    dispatch(FluxMail.Actions.setMail(newMail));
  }
});

@(connect(mapStateToProps, mapDispatchToProps))
class Compose extends Component<ComposeSpace.IProps, ComposeSpace.IState> {

  state = { to: '', subject: '' };


  onChange = (field: any) => (value: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [field]: value.target.value,
    });
  }

  onSendMail = () => {
    const selectedMail = findSelectedMail(this.props.mail);
    selectedMail.to = this.state.to;
    selectedMail.subject = this.state.subject;
    this.props.onSetMail(selectedMail);
    this.props.onSendMail(selectedMail.id);
  }

  render() {
    const { classes, mail, onCloseCompose } = this.props;

    const isOpen = isMailSelected(mail, SelectedType.COMPOSE);

    if (!isOpen) {
      return <div/>;
    }

    const selectedMail = findSelectedMail(mail);

    return (
      <Dialog
        open={true}
        fullScreen
        TransitionComponent={Transition}
      >
        <div className={classes.main}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={onCloseCompose} aria-label="Close">
                <Close/>
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Close
              </Typography>
              <Button color="inherit" onClick={this.onSendMail}>
                Send
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container spacing={8} className={classes.grid}>
            <Grid item sm={12}>
              <FormControl fullWidth style={{ padding: 5 }}>
                <TextField
                  value={this.state.to}
                  onChange={this.onChange('to')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">To</InputAdornment>,
                  }}
                />
                <TextField
                  value={this.state.subject}
                  onChange={this.onChange('subject')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Subject</InputAdornment>,
                  }}
                />
              </FormControl>
              {isOpen && <MailEdit selectedMail={selectedMail}/>}
            </Grid>
          </Grid>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(Compose as any);
 */