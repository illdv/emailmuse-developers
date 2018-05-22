import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IImageLibraryItem } from 'src/renderer/component/ImageLibrary/store/models';

namespace ImageLibraryDialogSpace {
  export interface IProps {
    item: IImageLibraryItem;
    onUpdate: (itemId:number, newName:string) => void;
    onDelete: (itemId:number) => void;
    onClose: () => void;
  }
  export interface IState {
    newName: string;
  }
}

export class ImageLibraryDialog
  extends React.Component<ImageLibraryDialogSpace.IProps, ImageLibraryDialogSpace.IState> {
  constructor(props) {
    super(props);
    this.state = {
      newName: props.item.name
    };
  }

  handleEditClose = () => {
    this.props.onClose();
  }

  handleUpdate = (e) => {
    e.preventDefault();
    this.props.onUpdate(this.props.item.id, this.state.newName);
    this.handleEditClose();
  }

  handleInput = (e) => {
    this.setState({ newName: e.target.value });
  }

  handleDelete = () => {
    this.props.onDelete(this.props.item.id);
    this.handleEditClose();
  }

  render() {
    return (
      <Dialog
        open={true}
        onClose={this.handleEditClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.handleUpdate}>
          <DialogTitle id="form-dialog-title">Change name of the image</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter new name of the image and click Submit to apply name change
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Image name"
              type="input"
              value={this.state.newName}
              fullWidth
              onChange={this.handleInput}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleEditClose} color="primary">
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
            >
              Update
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}