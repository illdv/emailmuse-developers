import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ITemplateState } from 'src/renderer/component/Templates/models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  GridList, GridListTile, GridListTileBar, IconButton
} from '@material-ui/core';
import { getImagesURLSelector } from 'src/renderer/component/ImageLibrary/store/selectors';
import { IImageLibraryItem } from 'src/renderer/component/ImageLibrary/store/models';
import {
  deleteImagesRequest,
  getImagesRequest,
  updateImageRequest, uploadImagesRequest
} from 'src/renderer/component/ImageLibrary/store/actions';
import { bindActionCreators } from 'redux';
import block from 'bem-ts';

const b = block('image-library-list');

export namespace DialogSelectImageSpace {
  export interface IState {

  }

  export interface IProps {
    isOpen: boolean;
    items?: IImageLibraryItem[];
    actions?: {
      getImagesRequest: typeof getImagesRequest,
      uploadImagesRequest: typeof uploadImagesRequest,
      deleteImagesRequest: typeof deleteImagesRequest,
      updateImageRequest: typeof updateImageRequest,
    };
    handleClose: () => void;
    insertImage: (url: string) => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  items: getImagesURLSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators({
    getImagesRequest,
    uploadImagesRequest,
    deleteImagesRequest,
    updateImageRequest
  }, dispatch),
});

@(connect(mapStateToProps, mapDispatchToProps))
export class DialogSelectImage extends Component<DialogSelectImageSpace.IProps, DialogSelectImageSpace.IState> {

  state = {};

  handleClose = () => {
    this.props.handleClose();
  }

  handleClickOpen = (url: string) => () => {
    this.props.insertImage(url);
  }

  componentDidMount() {
    this.props.actions.getImagesRequest();
  }

  render() {
    const items = this.props.items;
    console.log(items);
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{'Select image'}</DialogTitle>
        <DialogContent>
          <GridList
            cols={5}
            spacing={20}
          >
            {items.map((item: IImageLibraryItem) =>
              <GridListTile key={item.id}>
                <img
                  src={item.url}
                  onClick={this.handleClickOpen(item.url)}
                  className={b('tile-img')}
                />
                <GridListTileBar
                  title={item.name}
                />
              </GridListTile>
            )}
          </GridList>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
