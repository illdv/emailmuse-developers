import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { GridDirection, GridItemsAlignment, GridJustification } from '@material-ui/core/Grid/Grid';

export namespace InCenterSpace {
  export interface IState {

  }

  export interface IProps {
    alignItems: GridItemsAlignment;
    justify: GridJustification;
    direction: GridDirection;
  }
}

class Flex extends Component<InCenterSpace.IProps, InCenterSpace.IState> {

  state = {};

  render() {
    const { children, alignItems, direction, justify } = this.props;

    return (
      <Grid item xs={12} style={{ height: '100%' }}>
        <Grid
          style={{ height: '100%', marginTop: 0 }}
          container
          spacing={16}
          alignItems={alignItems}
          justify={justify}
          direction={direction}
        >
          {children}
        </Grid>
      </Grid>
    );
  }
}

export default Flex;
