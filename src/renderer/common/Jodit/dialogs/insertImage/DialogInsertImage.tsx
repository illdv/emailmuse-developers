import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, Paper, TablePagination } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import block from 'bem-ts';

import { IImageLibraryItem } from 'src/renderer/component/ImageLibrary/store/models';
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

import './DialogInsertImage.scss';
import { IPagination } from 'src/renderer/common/List/interface';

const b = block('dialogs-select-image');

export namespace DialogSelectImageSpace {
  export interface IState {

  }

  export interface IProps {
    isOpen: boolean;
    handleClose: () => void;
    insertHTML: (html: string, callback: () => void) => void;
    items?: IImageLibraryItem[];
    pagination?: IPagination;
    actions?: {
      getImagesRequest: typeof getImagesRequest,
      uploadImagesRequest: typeof uploadImagesRequest,
      deleteImagesRequest: typeof deleteImagesRequest,
      updateImageRequest: typeof updateImageRequest,
    };
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
export class DialogInsertImage extends Component<DialogSelectImageSpace.IProps, DialogSelectImageSpace.IState> {

  state = {};

  componentDidMount() {
    this.props.actions.getImagesRequest();
  }

  onSelectImage = (item: IImageLibraryItem) => () => {
    this.props.insertHTML(`<img width="300px" src="${item.thumb_url}" />`, this.props.handleClose);
  }

  onChangePage = (e, page) => {
    this.props.actions.getImagesRequest(page + 1);
  }

  render() {
    const { pagination } = this.props;
    return (
      <Dialog
        fullWidth
        className={b('dialog')}
        open={this.props.isOpen}
        onClose={this.props.handleClose}
        maxWidth={false}
        aria-labelledby='responsive-dialog-title'
      >
        <Paper elevation={4}>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color='primary'>
              Close
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    );
  }
}
