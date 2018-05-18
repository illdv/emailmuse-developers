import * as React from 'react';
import { DropTarget } from 'react-dnd';
import 'src/renderer/component/ImageLibrary/DragAndDropTarget.scss';

namespace DragAndDropTargetSpace {
  export interface IProps {
    onDrop: (item:any) => void;
    onDrag?: (isOverCurrent:boolean) => void;
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
    const item = monitor.getItem();
    if (item && item.files && props.onDrop) {
      props.onDrop(item);
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

  componentWillReceiveProps(props) {
    if (props.isOverCurrent !== this.props.isOverCurrent) {
      props.onDrag(props.isOverCurrent);
    }
  }

  render() {
    const {connectDropTarget, children} = this.props;
    return connectDropTarget(
      <div className={'dnd-target'}>
        {children}
      </div>
    );
  }
}