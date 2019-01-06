import * as React from 'react';
import {
  Button,
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';

type Props = {} & WithStyles<typeof styles>;

class GreatJob extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button>butt</Button>
      </div>
    );
  }
}

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

const styledGreatJob = withStyles(styles)(GreatJob);

export default connect(null)(styledGreatJob);
