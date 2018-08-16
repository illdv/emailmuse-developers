import * as React from 'react';
import { IconButton, TableCell } from '@material-ui/core';
import { Email } from '@material-ui/icons';
import { DragSource } from 'react-dnd';
import block from 'bem-ts';

const b = block('node_table_custom_row');

import { IListItem } from 'src/renderer/component/Emails/NodeList/NodeTableList';
import { IEmail, nodeType } from 'src/renderer/component/Emails/flux/interfaceAPI';

interface INodeTableRow<T> {
  onCopy?: (id: string) => void;
  item: IListItem;
  isSelected: boolean;
  onOpenItem: (T) => () => void;
  onUpdateEmail: (email: IEmail) => void;
  entity: T[];
  connectDragSource: any;
  isDragging: boolean;
}

const NodeTableRow: React.SFC<INodeTableRow<any>> = (
  { onCopy, item, isSelected, onOpenItem, entity, connectDragSource, isDragging }) => {
  // const handleCopy = (id: string) => onCopy && onCopy(id);
  const handleOpen = () => onOpenItem({ item: entity, type: nodeType.email });

  return (
    connectDragSource(
      <tr
        role='checkbox'
        aria-checked={isSelected}
        tabIndex={-1}
        // selected={isSelected}
        className={b()}
        onClick={handleOpen}
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
            {
              /*      <IconButton title={'Create Duplicate'}>
              <ContentCopyIcon/>
            </IconButton>*/
            }
            <IconButton><Email/></IconButton>
            {/*<IconButton><Folder/></IconButton>*/}

          </TableCell>
          // ||
          // <TableCell onClick={onSelect(item.id)} padding='checkbox'/>
        }
        <TableCell component='th' scope='row' padding='none'>
          {item.title}

        </TableCell>
        <TableCell>
          {item.description || '---'}
        </TableCell>

        <TableCell>
          {item.rightText || '---'}
        </TableCell>
      </tr>)
  );
};

export const INodeTypes = {
  EMAIL: 'email',
  FOLDER: 'folder',
};
const NodeSource = {
  beginDrag(props) {
    return {
      itemId: props.entity.id,
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource(INodeTypes.EMAIL, NodeSource, collect)(NodeTableRow);
