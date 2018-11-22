import * as React from 'react';
import { ReactElement } from 'react';
import { connect, Dispatch } from 'react-redux';
import * as classNames from 'classnames';

import { Button, PropTypes, Zoom } from '@material-ui/core/';
import { HotKey } from 'src/renderer/common/HotKey/HotKey';

interface IFabProps {
  position: number;
  title: string;
  onClick?: any;
  className?: string;
  icon?: ReactElement<any>;
  color?: PropTypes.Color;
  hotKey?: string;
  whitCtrl?: boolean;
  isFly?: boolean;
  children?: any;
  bottom?: string;
  variant?:
    | 'fab'
    | 'text'
    | 'flat'
    | 'outlined'
    | 'contained'
    | 'raised'
    | 'extendedFab';
}

const initFabProps = (): IFabProps => ({
  hotKey: '',
  whitCtrl: false,
  onClick: null,
  title: '',
  color: 'primary',
  icon: null,
  position: 0,
  isFly: true,
});

export function Fab(props: IFabProps = initFabProps()) {
  const {
    color,
    icon,
    onClick,
    position,
    className,
    hotKey,
    title,
    whitCtrl,
    isFly,
    children,
    bottom = null,
    variant = 'fab',
  } = { ...initFabProps(), ...props };
  return (
    <Zoom in={true} timeout={1000} unmountOnExit>
      <HotKey
        whitCtrl={whitCtrl}
        hotKey={hotKey}
        tooltip={title}
        onPress={onClick}
      >
        <Button
          style={{ zIndex: 99, right: 62 * position + 20, bottom, margin: 8 }}
          className={`${classNames({ fab: isFly })} ${className}`}
          color={color}
          variant={variant}
          onClick={onClick}
        >
          {children ? children : icon}
        </Button>
      </HotKey>
    </Zoom>
  );
}
