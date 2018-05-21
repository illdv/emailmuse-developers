import { ChangeEvent, Component, ReactElement } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import InCenter from 'src/renderer/common/InCenter';
import { Grid, Grow, Paper, TextField, Theme, WithStyles, withStyles } from '@material-ui/core/';
import { Navigation, Title } from 'src/renderer/component/Auth/common/Common';

const styles = (theme: Theme) => ({
  root: {
    height: '100%',
  },
  paper: {
    width: 370,
    height: 416,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 48,
    paddingBottom: 26,
  }
});

export namespace PaperDialogSpace {
  export interface IState {
    value: string;
  }

  export interface IProps {
    classes?: any;
    title: string;
    subtitle?: string;
    label: string;
    body?: ReactElement<any>;
    /**
     * Happened if user enter value and click next.
     */
    onEnterCompleted?: (value: string) => void;
    /**
     * Happened if user click onBack.
     */
    onBack?: () => void;
  }
}

class PaperDialog extends Component<PaperDialogSpace.IProps & WithStyles<any>, PaperDialogSpace.IState> {

  state = { value: '' };

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value
    });
  }

  onBack = () => {
    this.props.onBack();
  }

  onNext = () => {
    this.props.onEnterCompleted(this.state.value);
  }

  render() {
    const { classes, title, label, subtitle, body } = this.props;

    return (
      <InCenter>
        <Paper square className={classes.paper}>
          <Grid container spacing={24} className={classes.root}>
            <Title title={title} subtitle={subtitle}/>
            <Grow in timeout={1000}>
              <Grid container item xs={12} style={{ paddingTop: 0 }}>
                <Grid item xs={12}>
                  {body ||
                  <TextField
                    fullWidth
                    label={label}
                    margin="normal"
                    onChange={this.onChange}
                  />
                  }
                </Grid>
              </Grid>
            </Grow>
            <Navigation onBack={this.onBack} onNext={this.onNext}/>
          </Grid>
        </Paper>
      </InCenter>
    );
  }
}

export default withStyles(styles)(PaperDialog);
