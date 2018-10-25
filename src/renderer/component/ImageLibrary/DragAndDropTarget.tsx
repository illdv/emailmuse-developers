import * as React from 'react';
import { DropTarget } from 'react-dnd';

import 'src/renderer/component/ImageLibrary/DragAndDropTarget.scss';
import block from 'bem-ts';
import { classNamesImage } from 'src/renderer/component/Tutorial/steps/image';

const b = block('dnd-target');

namespace DragAndDropTargetSpace {
  export interface IProps {
    onDrop: (item: any) => void;
    showOverlay?: boolean;
    overlayMessage?: string;
    connectDropTarget?: any;
    canDrop?: boolean;
    dragOver?: boolean;
  }

  export interface IState {

  }
}

const types = {
  FILE: '__NATIVE_FILE__',
};

const specs = {
  drop(props, monitor, component) {
    if (props.onDrop) {
      const item = monitor.getItem();
      if (item.files && item.files.length) {
        props.onDrop(item);
      }
    }
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  dragOver: monitor.isOver(),
});

@DropTarget(types.FILE, specs, collect)
export class DragAndDropTarget extends React.Component<DragAndDropTargetSpace.IProps, DragAndDropTargetSpace.IState> {
  constructor(props) {
    super(props);
  }

  render() {
    const { connectDropTarget, canDrop, dragOver, showOverlay, overlayMessage, children } = this.props;
    return connectDropTarget(
      <div className={`${b()}`}>
        {showOverlay ?
          <div className={b('overlay', { 'can-drop': canDrop, 'drag-over': dragOver })}>
            {overlayMessage ? <span>{overlayMessage}</span> : null}
          </div> :
          null
        }
        {children}
      </div>,
    );
  }
}
