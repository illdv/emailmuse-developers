import { Component, ReactElement } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import InCenter from 'src/renderer/common/InCenter';
import { Grid, Grow, Paper, WithStyles, withStyles } from '@material-ui/core/';
import { TextValidator } from 'src/renderer/common/Validation/TextValidator';
import { Navigation, Title } from 'src/renderer/component/Profile/Auth/common/Common';

const styles = () => ({
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
  },
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
    defaultValue: string;
    id: string;
    canNext?: boolean;
    /**
     * Happened if name enter value and click next.
     */
    onEnterCompleted?: (value: string) => void;
    /**
     * Happened if name click onBack.
     */
    onBack?: () => void;
    validation: object;
  }
}

class PaperDialog extends Component<PaperDialogSpace.IProps & WithStyles<any>, PaperDialogSpace.IState> {

  state = { value: '' };

  static defaultProps = {
    canNext: true,
  };

  static getDerivedStateFromProps(
    nextProps: PaperDialogSpace.IProps,
    prevState: PaperDialogSpace.IState): PaperDialogSpace.IState {

    const { defaultValue } = nextProps;
    if (defaultValue !== prevState.value) {
      return {
        value: defaultValue,
      };

    }
    return null;
  }

  onBack = () => {
    this.props.onBack();
  }

  onNext = () => {
    this.props.onEnterCompleted(this.state.value);
  }

  render() {
    const { classes, title, label, subtitle, body, validation, id } = this.props;

    return (
      <InCenter>
        <Paper square className={classes.paper}>
          <Grid container spacing={24} className={classes.root}>
            <Title title={title} subtitle={subtitle}/>
            <Grow in timeout={1000}>
              <Grid container item xs={12} style={{ paddingTop: 0 }}>
                <Grid item xs={12}>
                  {body ||
                  <TextValidator
                    fullWidth
                    id={id}
                    label={label}
                    margin='normal'
                    schema={validation}
                  />
                  }
                </Grid>
              </Grid>
            </Grow>
            <Navigation onBack={this.onBack} onNext={this.onNext} canNext={this.props.canNext}/>
          </Grid>
        </Paper>
      </InCenter>
    );
  }
}

export default withStyles(styles)(PaperDialog);
