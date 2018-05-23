/*
import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core/';
import { FluxBookmarks } from 'src/renderer/component/Bookmarks/flux/action';

export namespace EditBookmarksSpace {
  export interface IState {

  }

  export interface IProps {
    bookmarks: FluxBookmarks.IState;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  nameStore: state.bookmarks,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  /!*
    onLoadingMail: () => {
     dispatch(Mail.Actions.onLoadingMail.REQUEST());
   },
  *!/
});

@(connect(mapStateToProps, mapDispatchToProps))
export class EditBookmarks extends Component<EditBookmarksSpace.IProps, EditBookmarksSpace.IState> {

  state = {};

  onClose = () => {

  };

  render() {
    const { bookmarks } = this.props;
    return (
      <Dialog
        open={bookmarks.selectedBookmarkId}
        onClose={this.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send
            updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            typeRequest="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
*/
