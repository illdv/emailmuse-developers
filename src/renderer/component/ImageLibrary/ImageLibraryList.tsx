import * as React from 'react';
import {GridList, GridListTile, GridListTileBar} from '@material-ui/core';
import 'src/renderer/component/ImageLibrary/ImageLibraryList.scss';
import block from 'bem-ts';
import { IImageLibraryItem } from 'src/renderer/component/ImageLibrary/store/models';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const b = block('image-library-list');

namespace ImageLibraryListSpace {
  export interface IProps {
    items: IImageLibraryItem[];
    onDelete?: (id) => () => void;
    onEdit?: (id, name) => void;
  }
  export interface IState {
    openDialog: boolean;
    chosenImageId: number;
    newName: string;
  }
}

export class ImageLibraryListComponent extends
  React.Component<ImageLibraryListSpace.IProps, ImageLibraryListSpace.IState> {

  constructor(props){
    super(props);
    this.state = { openDialog: false, chosenImageId: 0, newName: '' };
  }

  handleClickOpen = (itemId) => () => {
    this.setState({ openDialog: true, chosenImageId: itemId });
  }

  handleClose = () => {
    this.setState({ openDialog: false, chosenImageId: 0, newName: '' });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onEdit(this.state.chosenImageId, this.state.newName);
    this.handleClose();
  }

  onInput = (e) => {
    this.setState({ newName: e.target.value });
  }

  renderDialog = () => {
    return (
      <Dialog
        open={this.state.openDialog}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.onSubmit}>
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
            fullWidth
            onChange={this.onInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
        </form>
      </Dialog>

    );
  }

  render() {
    return (
      <>
        {this.state.openDialog ? this.renderDialog() : null}
        <GridList
          className={b()}
          cols={3}
          spacing={20}
        >
          {this.props.items.map(item =>
            <GridListTile
              className={b('tile')}
              key={item.id}
            >
              <img
                src={item.url}
                onClick={this.handleClickOpen(item.id)}
                className={b('tile-img')}
              />
              <GridListTileBar
                title={item.name}
                actionIcon={
                  <IconButton onClick={this.props.onDelete(item.id)}>
                    <Delete nativeColor='white'/>
                  </IconButton>
                }
                // subtitle={<span>{new Date(item.name).toDateString()}</span>}
              />
            </GridListTile>
          )}
        </GridList>
      </>
    );
  }
}
