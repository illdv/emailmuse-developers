import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

export namespace AccountItemExistingSpace {
  export interface IProps {
    displayName?: string;
    onRemove?: () => void;
  }
}

export const AccountItemExtising:
  React.SFC<AccountItemExistingSpace.IProps> = (props: AccountItemExistingSpace.IProps) => {
    const { displayName, onRemove } = props;

    const handleRemove = () => {
      onRemove();
    };

    return (
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={displayName} />
        {
          onRemove &&
          <IconButton color='inherit' onClick={handleRemove} aria-label='Close'>
            <CloseIcon />
          </IconButton>
        }
      </ListItem>
    );
};
