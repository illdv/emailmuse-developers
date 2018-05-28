import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppBar, Dialog, IconButton, Paper, TablePagination, Toolbar, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { bindActionCreators } from 'redux';
import block from 'bem-ts';

import { IImageLibraryItem, IPagination } from 'src/renderer/component/ImageLibrary/store/models';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ImageLibraryList } from 'src/renderer/component/ImageLibrary/ImageLibraryList';
import {
  getCurrentPageSelector,
  getImagesURLSelector,
  getLastPageSelector,
  getPerPageSelector,
  getTotalImages,
} from 'src/renderer/component/ImageLibrary/store/selectors';
import {
  deleteImagesRequest,
  getImagesRequest,
  updateImageRequest,
  uploadImagesRequest,
} from 'src/renderer/component/ImageLibrary/store/actions';

const b = block('dialog-image-library-list');

export namespace DialogSelectImageSpace {
  export interface IState {

  }

  export interface IProps {
    isOpen: boolean;
    items?: IImageLibraryItem[];
    pagination?: IPagination;
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
  pagination: {
    current_page: getCurrentPageSelector(state),
    total: getTotalImages(state),
    last_page: getLastPageSelector(state),
    per_page: getPerPageSelector(state),
  },
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators({
    getImagesRequest,
    uploadImagesRequest,
    deleteImagesRequest,
    updateImageRequest,
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

  onSelectImage = (item: IImageLibraryItem) => () => {
    this.props.insertImage(item.url);
  }

  onChangePage = (e, page) => {
    this.props.actions.getImagesRequest(page + 1);
  }

  render() {
    const { pagination, items } = this.props;
    console.log(items);
    return (
      <Dialog
        fullWidth
        className={b('dialog')}
        open={this.props.isOpen}
        onClose={this.handleClose}
        maxWidth={false}
        aria-labelledby='responsive-dialog-title'
      >
        <Paper elevation={4}>
          <div className={b('container')}>
            {
              pagination.total &&
              <TablePagination
                component='div'
                count={pagination.total}
                rowsPerPage={pagination.per_page}
                rowsPerPageOptions={[16]}
                page={pagination.current_page - 1}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.onChangePage}
              />
            }
            <ImageLibraryList
              items={this.props.items}
              onSelect={this.onSelectImage}
            />
          </div>
        </Paper>
      </Dialog>
    );
  }
}
