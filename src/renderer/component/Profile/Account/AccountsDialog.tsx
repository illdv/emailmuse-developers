import * as React from 'react';
import List from '@material-ui/core/List';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { AccountItemNew } from 'src/renderer/component/Profile/Account/AccountItemNew';
import { AccountItemExtising } from 'src/renderer/component/Profile/Account/AccountItemExisting';
import { IEmailAccount } from 'src/renderer/component/Profile/Account/flux/interface';
import { connect } from 'react-redux';

const emails: IEmailAccount[] = [
  {
    id: 0,
    email: 'ololoshka@gmail.com',
    user_id: 17,
  },
  {
    id: 1,
    email: 'sportloto@gmail.com',
    user_id: 17,
  },
  {
    id: 2,
    email: 'mighty.mike@gmail.com',
    user_id: 17,
  },
];

export namespace AccountsDialogSpace {
  export interface IProps {
    onClose: () => void;
    onItemClick: (selected: string) => void;
    open: boolean;
    emailAccounts?: IEmailAccount[];
  }
  export interface IState {
  }
}

const mapStateToProps = state => ({
  emailAccounts: emails,
});

@connect(mapStateToProps)
export class AccountsDialog extends React.Component<AccountsDialogSpace.IProps, AccountsDialogSpace.IState> {
  constructor(props) {
    super(props);
  }

  handleClose = () => {
    this.props.onClose();
  }

  handleAddNew = () => {
    console.log('Adding new account');
  }

  handleRemove = (item: IEmailAccount) => () => {
    console.log('Removing', item.email);
  }

  render() {
    const { open, emailAccounts } = this.props;

    return (
      <Dialog open={open} onClose={this.handleClose} aria-labelledby='simple-dialog-title'>
        <DialogTitle id='simple-dialog-title'>
          Manage your connected email accounts
        </DialogTitle>
        <div>
          <List>
            {
              emailAccounts.map(account => (
              <AccountItemExtising
                displayName={account.email}
                onRemove={this.handleRemove(account)}
                key={account.id}
              />
            ))
            }
            <AccountItemNew onAddNew={this.handleAddNew}/>
          </List>
        </div>
      </Dialog>
    );
  }
}
