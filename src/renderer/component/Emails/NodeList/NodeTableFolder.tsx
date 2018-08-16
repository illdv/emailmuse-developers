import * as React from 'react';
import { IconButton, TableCell } from '@material-ui/core';
import { Delete, Folder } from '@material-ui/icons';
import { DropTarget } from 'react-dnd';
import block from 'bem-ts';

const b = block('node_table_custom_row');

import { IFolder } from 'src/renderer/component/Folder/flux/interface';
import { IEmail, nodeType } from 'src/renderer/component/Emails/flux/interfaceAPI';

interface INodeTableRow<T> {
  onCopy?: (id: string) => void;
  item: IFolder;
  isSelected: boolean;
  onOpenItem: (T) => () => void;
  onDeleteFolder: (id: number) => void;
  onUpdateEmail: (email: IEmail) => void;
  connectDropTarget: any;
  isDragging: boolean;
}

const NodeTableFolder: React.SFC<INodeTableRow<any>> = (
  { onCopy, item, isSelected, onOpenItem, connectDropTarget, isDragging, onDeleteFolder, onUpdateEmail }) => {
  // const handleCopy = (id: string) => onCopy && onCopy(id);
  const handleOpen = () => onOpenItem({ item, type: nodeType.folder });
  const handleDelete = () => onDeleteFolder(item.id);

  return (
    connectDropTarget(
      <tr
        role='checkbox'
        aria-checked={isSelected}
        tabIndex={-1}
        // selected={isSelected}
        className={b()}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {
          onCopy
          &&
          <TableCell
            style={{ width: 40 }}
            // onClick={handleCopy(item.id)}
            padding={'checkbox'}
          >
            <IconButton onClick={handleOpen}><Folder/></IconButton>
          </TableCell>
          // ||
          // <TableCell onClick={onSelect(item.id)} padding='checkbox'/>
        }
        <TableCell component='th' scope='row' padding='none' onClick={handleOpen}>
          {item.name}
        </TableCell>
        <TableCell>Folder</TableCell>
        <TableCell>
          {item.updated_at || '---'}
        </TableCell>
        <TableCell>
          <IconButton onClick={handleDelete}><Delete/></IconButton>
        </TableCell>
      </tr>)
  );
};

export const INodeTypes = {
  EMAIL: 'email',
  FOLDER: 'folder',
};

const folderTarget = {
  drop({ item, onUpdateEmail }, monitor) {
    console.log('Target folder =>', item);
    const targetEmail = monitor.getItem();
    onUpdateEmail({id: targetEmail.itemId, folder_id: item.id });
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

export default DropTarget(INodeTypes.EMAIL, folderTarget, collect)(NodeTableFolder);
