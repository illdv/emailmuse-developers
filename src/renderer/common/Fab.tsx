import { ReactElement } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, PropTypes, Zoom } from '@material-ui/core/';

export function Fab(props: {onClick: any, className: string, icon: ReactElement<any>, color?: PropTypes.Color}) {
  return (
    <Zoom
      in={true}
      timeout={1000}
      unmountOnExit
    >
      <Button
        style={{zIndex: 99}}
        className={props.className}
        color={props.color || 'primary'}
        variant="fab"
        onClick={props.onClick}
      >
        {props.icon}
      </Button>
    </Zoom>
  );
}