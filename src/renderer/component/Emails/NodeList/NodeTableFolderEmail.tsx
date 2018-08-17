import * as React from 'react';
import { IconButton, TableCell } from '@material-ui/core';
import { Delete, Email, Folder } from '@material-ui/icons';
import { DropTarget, DragSource } from 'react-dnd';
import block from 'bem-ts';

const b = block('node_table_custom_row');
import { IFolderEmail, nodeType } from 'src/renderer/component/Emails/flux/interfaceAPI';

interface INodeTableRow<T> {
  item: IFolderEmail;
  onOpenItem: (folderEmail: IFolderEmail) => () => void;
  onDeleteFolder: (folderEmail: IFolderEmail) => void;
  onUpdateEmail: (folderEmail: IFolderEmail) => void;
  connectDropTarget: any;
  isDragging: boolean;
  connectDragSource: any;
  isOver: boolean;
}

export const INodeTypes = {
  EMAIL: 'email',
  FOLDER: 'folder',
};

const NodeTarget = {
  drop({ item, onUpdateEmail }, monitor) {
    const targetEmail = monitor.getItem().item;
    if (targetEmail.type === nodeType.email) {
      onUpdateEmail({ id: targetEmail.id, folder_id: item.id });
    }
  },
};

const NodeSource = {
  beginDrag({ item }) {
    return { item };
  },
};

@DropTarget(INodeTypes.EMAIL, NodeTarget, collectTarget)
@DragSource(INodeTypes.EMAIL, NodeSource, collectSource)
export class NodeTableFolderEmail extends React.Component<any, any> {
  isFolder = this.props.item.type === nodeType.folder;

  handleOpen = () => this.props.onOpenItem(this.props.item);
  handleDelete = () => this.props.onDeleteFolder(this.props.item);

  render() {
    const { connectDropTarget, connectDragSource, isDragging, item } = this.props;
    return connectDragSource(
      connectDropTarget(
        <tr
          role='checkbox'
          // aria-checked={isSelected}
          tabIndex={-1}
          // selected={isSelected}
          className={b()}
          style={{ opacity: isDragging ? 0.5 : 1 }}
        >
          <TableCell
            style={{ width: 40 }}
            // onClick={handleCopy(item.id)}
            padding={'checkbox'}
          >
            <IconButton onClick={this.handleOpen}>
              {this.isFolder ? <Folder/> : <Email/>}
            </IconButton>
          </TableCell>

          <TableCell component='th' scope='row' padding='none' onClick={this.handleOpen}>
            {item.title}
          </TableCell>
          <TableCell>
            {this.isFolder ? 'Folder' : item.description}
          </TableCell>
          <TableCell>
            {item.updated_at || '---'}
          </TableCell>
          <TableCell>
            {this.isFolder ? <IconButton onClick={this.handleDelete}><Delete/></IconButton> : null}
          </TableCell>
        </tr>),
    );
  }

}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}
