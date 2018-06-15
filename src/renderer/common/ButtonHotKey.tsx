import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button/Button';
import { HotKey } from 'src/renderer/common/HotKey/HotKey';

export namespace ButtonHotKeySpace {
  export interface IState {

  }

  export interface IProps extends ButtonProps {
    hotKey: string;
    whitCtrl?: boolean;
  }
}

export class ButtonHotKey extends Component<ButtonHotKeySpace.IProps, ButtonHotKeySpace.IState> {

  state: ButtonHotKeySpace.IState = {
    hotKey: '',
    whitEnter: false,
  };

  onPress = () => {
    this.props.onClick(null);
  }

  render() {
    const { children, hotKey, whitCtrl, ...props } = this.props;

    return (
      <HotKey whitCtrl={whitCtrl} hotKey={hotKey} onPress={this.onPress}>
        <Button {...props} >
          {children}
        </Button>
      </HotKey>
    );
  }
}
