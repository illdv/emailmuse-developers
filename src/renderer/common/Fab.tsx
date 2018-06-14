import * as React from 'react';
import { ReactElement } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, PropTypes, Tooltip, Zoom } from '@material-ui/core/';

interface IFabProps {
  onClick: any;
  className?: string;
  icon: ReactElement<any>;
  color?: PropTypes.Color;
  position: number;
  title: string;
}

export function Fab(props: IFabProps) {
  const { className, color, icon, onClick, position, title } = props;
  return (
    <Zoom
      in={true}
      timeout={1000}
      unmountOnExit
    >
      <Tooltip title={title}>
        <Button
          style={{ zIndex: 99, right: (62 * position) + 20 }}
          className={`fab ${className}`}
          color={color || 'primary'}
          variant='fab'
          onClick={onClick}
        >
          {icon}
        </Button>
      </Tooltip>
    </Zoom>
  );
}
