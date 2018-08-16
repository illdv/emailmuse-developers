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

const NodeTableFolderEmail: React.SFC<INodeTableRow<any>> = (
  {
    connectDropTarget, connectDragSource, isDragging,
    item, onDeleteFolder, onOpenItem, onUpdateEmail,
  }) => {
  const isFolder = item.type === nodeType.folder;

  const handleOpen = () => onOpenItem(item);
  const handleDelete = () => onDeleteFolder(item);

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
          <IconButton onClick={handleOpen}>
            {isFolder ? <Folder/> : <Email/>}
          </IconButton>
        </TableCell>

        <TableCell component='th' scope='row' padding='none' onClick={handleOpen}>
          {item.title}
        </TableCell>
        <TableCell>
          {isFolder ? 'Folder' : item.description}
        </TableCell>
        <TableCell>
          {item.updated_at || '---'}
        </TableCell>
        <TableCell>
          {isFolder ? <IconButton onClick={handleDelete}><Delete/></IconButton> : null}
        </TableCell>
      </tr>),
  );
};

const NodeTarget = {
  drop({ item, onUpdateEmail }, monitor) {
    console.log('Target folder =>', item);
    const targetEmail = monitor.getItem();
    if (item.type === nodeType.folder) {
      onUpdateEmail({ id: targetEmail.itemId, folder_id: item.id });
    } else {
      console.log('(item.type = email =>');
    }
  },
};

const NodeSource = {
  beginDrag(props) {
    return {
      itemId: props.item.id,
    };
  },
};

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

export default DragSource(INodeTypes.FOLDER, NodeSource, collectSource)(
  DropTarget(INodeTypes.EMAIL, NodeTarget, collectTarget)(NodeTableFolderEmail),
);
