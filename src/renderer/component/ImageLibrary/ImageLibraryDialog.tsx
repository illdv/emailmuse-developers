import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Language from '@material-ui/icons/Language';
import { IImageLibraryItem } from 'src/renderer/component/ImageLibrary/store/models';
import block from 'bem-ts';
const b = block('image-library-dialog');
import 'src/renderer/component/ImageLibrary/ImageLibraryDialog.scss';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { connect, Dispatch } from 'react-redux';

namespace ImageLibraryDialogSpace {
  export interface IProps {
    item: IImageLibraryItem;
    onUpdateItem: (item:IImageLibraryItem, newName:string) => void;
    onDeleteItem: (item:IImageLibraryItem) => () => void;
    onClose: () => void;
    onShowToast?: (messages: string, type: ToastType) => void;
  }
  export interface IState {
    newName: string;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onShowToast: (messages: string, type: ToastType) => {
    dispatch(FluxToast.Actions.showToast(messages, type));
  }
});

@connect(null, mapDispatchToProps)
export class ImageLibraryDialog
  extends React.Component<ImageLibraryDialogSpace.IProps, ImageLibraryDialogSpace.IState> {
  constructor(props) {
    super(props);
    this.state = {
      newName: props.item.name
    };
  }

  handleDialogClose = () => {
    this.props.onClose();
  }

  handleUpdateItem = (e) => {
    e.preventDefault();
    this.props.onUpdateItem(this.props.item, this.state.newName);
    this.handleDialogClose();
  }

  handleInput = (e) => {
    this.setState({ newName: e.target.value });
  }

  handleDeleteItem = () => {
    this.props.onDeleteItem(this.props.item)();
    this.handleDialogClose();
  }

  inputClick = (e) => {
    e.preventDefault();
    const p = document.getElementById('url') as HTMLInputElement;
    p.select();
    const status = document.execCommand('copy');
    if (status) {
      this.props.onShowToast('URL copied to clipboard', ToastType.Success);
    } else {
      this.props.onShowToast('URL copying failed', ToastType.Error);
    }
  }

  preventDefault = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <Dialog
        open={true}
        onClose={this.handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.handleUpdateItem}>
          <DialogTitle id="form-dialog-title">Edit image</DialogTitle>
          <DialogContent className={b('content')}>
            <DialogContentText>Enter new name of this image and click 'Update' to apply changes.</DialogContentText>
            <DialogContentText>Or click 'Delete' to delete this image from library.</DialogContentText>
            <img
              src={this.props.item.url}
              className={b('img')}
            />
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
            <TextField
              margin="dense"
              id="url"
              label="Image URL"
              type="input"
              value={this.props.item.url}
              fullWidth
              onClick={this.inputClick}
              onChange={this.preventDefault}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    className={b('url-field')}
                  >
                    <Language />
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
            >
              Update
            </Button>
            <Button onClick={this.handleDeleteItem} color="primary">
              Delete
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}