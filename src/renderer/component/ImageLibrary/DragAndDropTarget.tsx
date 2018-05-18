import * as React from 'react';
import { DropTarget } from 'react-dnd';
import 'src/renderer/component/ImageLibrary/DragAndDropTarget.scss';
import block from 'bem-ts';
const b = block('dnd-target');

namespace DragAndDropTargetSpace {
  export interface IProps {
    onDrop: (item:any) => void;
    showOverlay?: boolean;
    overlayMessage?: string;
    connectDropTarget?: any;
    isOverCurrent?: boolean;
  }
  export interface IState {

  }
}

const types = {
  FILE: '__NATIVE_FILE__'
};

const specs = {
   drop(props, monitor, component) {
     if (props.onDrop) {
       props.onDrop(monitor.getItem());
     }
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true })
});

@DropTarget(types.FILE, specs, collect)
export class DragAndDropTarget extends React.Component<DragAndDropTargetSpace.IProps, DragAndDropTargetSpace.IState> {
  constructor (props) {
    super(props);
  }

  render() {
    const {connectDropTarget, isOverCurrent, showOverlay, overlayMessage, children} = this.props;
    return connectDropTarget(
      <div className={b()}>
        {showOverlay ? <div className={b('overlay-background', {dragging: isOverCurrent})}/> : null}
        {showOverlay && overlayMessage ?
          <div className={b('overlay-message', {dragging: isOverCurrent})}>
            <span>{overlayMessage}</span>
          </div> :
          null
        }
        {children}
      </div>
    );
  }
}
