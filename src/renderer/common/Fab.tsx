import * as React from 'react';
import { ReactElement } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, PropTypes, Zoom } from '@material-ui/core/';
import { HotKey } from 'src/renderer/common/HotKey/HotKey';

interface IFabProps {
  onClick?: any;
  className?: string;
  icon?: ReactElement<any>;
  color?: PropTypes.Color;
  position: number;
  title: string;
  hotKey?: string;
  whitCtrl?: boolean;
}

const initFabProps = (): IFabProps => ({
  hotKey: '',
  whitCtrl: false,
  onClick: null,
  className: '',
  title: '',
  color: 'primary',
  icon: null,
  position: 0,
});

export function Fab(props: IFabProps = initFabProps()) {
  const { className, color, icon, onClick, position, hotKey, title, whitCtrl } = {...initFabProps(), ...props};
  return (
    <Zoom
      in={true}
      timeout={1000}
      unmountOnExit
    >
      <HotKey whitCtrl={whitCtrl} hotKey={hotKey} tooltip={title} onPress={onClick}>
        <Button
          style={{ zIndex: 99, right: (62 * position) + 20 }}
          className={`fab ${className}`}
          color={color}
          variant='fab'
          onClick={onClick}
        >
          {icon}
        </Button>
      </HotKey>
    </Zoom>
  );
}
