import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';

export namespace AccountItemNewSpace {
  export interface IProps {
    onAddNew?: () => void;
  }
  export interface IState {

  }
}

export const AccountItemNew: React.SFC<AccountItemNewSpace.IProps> = (props: AccountItemNewSpace.IProps) => {
  const handleAddNew = () => {
    props.onAddNew();
  };

  return (
    <ListItem button key={'add-new'} onClick={handleAddNew}>
      <ListItemAvatar>
        <Avatar>
          <AddIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={'Add new account'}/>
    </ListItem>
  );
};
