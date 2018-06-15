import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import { isCtrlPress, isKeyPress } from 'src/renderer/common/HotKey/utils';

export namespace HotKeySpace {
  export interface IState {

  }

  export interface IProps {
    hotKey: string;
    whitCtrl?: boolean;
    tooltip?: string;
    onPress: () => void;
  }
}

export class HotKey extends Component<HotKeySpace.IProps, HotKeySpace.IState> {

  state: HotKeySpace.IState = {
    hotKey: '',
    whitEnter: false,
    tooltip: null,
  };

  handleEnterPress = (event: DocumentEventMap['keydown']) => {
    if (this.props.whitCtrl) {
      if (isCtrlPress(event)) {
        if (isKeyPress(event, this.props.hotKey)) {
          event.preventDefault();
          this.props.onPress();
        }
      }
    } else {
      if (isKeyPress(event, this.props.hotKey)) {
        event.preventDefault();
        this.props.onPress();
      }
    }
  }

  componentDidMount(): void {
    document.addEventListener('keydown', this.handleEnterPress, false);
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.handleEnterPress, false);
  }

  getHotKeyName = (): string => {
    const { hotKey, whitCtrl } = this.props;

    if (whitCtrl) {
      if (navigator.platform.includes('Mac')) {
        return `Cmd + ${hotKey}`;
      } else {
        return `Ctrl + ${hotKey}`;
      }
    }

    return hotKey;
  }

  render() {
    const { children, tooltip } = this.props;

    if (!children) {
      return <></>;
    }

    let title: string = this.getHotKeyName();

    if (tooltip) {
      title = `${tooltip} ${title}`;
    }

    return (
      <Tooltip title={title}>
        {children as any}
      </Tooltip>
    );
  }
}
