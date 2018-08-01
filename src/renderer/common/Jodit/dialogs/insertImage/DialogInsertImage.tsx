import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  TablePagination,
  Typography, WithStyles,
  withStyles,
} from '@material-ui/core';
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
import { Search } from 'src/renderer/common/Search';
import { DragAndDropTarget } from 'src/renderer/component/ImageLibrary/DragAndDropTarget';
import { IStyle } from 'type/materialUI';
import { Close, CloudUpload } from '@material-ui/icons';
import { PreLoaderLayout } from 'src/renderer/common/PreloaderLayout/PreLoaderLayout';

const b = block('dialogs-select-image');
const styles: IStyle = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

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

export class DialogInsertImage extends Component<DialogSelectImageSpace.IProps & WithStyles<any>,
  DialogSelectImageSpace.IState> {
  state = {};

  componentDidMount() {
    this.props.actions.getImagesRequest();
  }

  onSelectImage = (item: IImageLibraryItem) => () => {
    this.props.insertHTML(`<img src="${item.thumb_url}" />`, this.props.handleClose);
    this.props.actions.getImagesRequest();
  };

  onChangePage = (e, page) => {
    this.props.actions.getImagesRequest(page + 1);
  };

  onLoading = (searchWorld: string) => {
    this.props.actions.getImagesRequest(1, searchWorld);
    this.setState({ searchWorld });
  };

  onClose = () => {
    this.props.handleClose();
    this.props.actions.getImagesRequest();
  };

  onDropFile = item => {
    if (item && item.files) {
      this.props.actions.uploadImagesRequest(item.files);
    }
  };
  deleteItem = (item: IImageLibraryItem) => () => {
    this.props.actions.deleteImagesRequest(item.id);
  };

  render() {
    const { pagination } = this.props;
    return (
      <Dialog
        fullWidth
        className={b('dialog')}
        open={this.props.isOpen}
        onClose={this.onClose}
        maxWidth={false}
        aria-labelledby='responsive-dialog-title'
      >
        <Paper elevation={4}>
          <DialogActions>
            <Close
              style={{ cursor: 'pointer' }}
              onClick={this.props.handleClose}
            />
          </DialogActions>
          <DialogContent>
            <div className={b('container')}>
              <div className={b('header')}>
                <div className={b('header__search')}>
                  <Search search={this.onLoading}/>
                  {
                    pagination.total &&
                    <TablePagination
                      component='div'
                      count={pagination.total}
                      rowsPerPage={pagination.per_page}
                      rowsPerPageOptions={[16]}
                      page={pagination.current_page - 1}
                      backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                      nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                      onChangePage={this.onChangePage}
                    />
                    ||
                    <div style={{ height: 20 }}>
                      <p>Not found</p>
                    </div>
                  }
                </div>
                <div className={b('header__title')}>
                  <Typography>Drag and drop image file to upload
                  </Typography>
                  <CloudUpload
                    style={{
                      width: 72,
                      height: 72,
                      padding: 16,
                    }}
                  />
                </div>

              </div>
              <PreLoaderLayout style={{ padding: 16 }}/>
              <DragAndDropTarget
                onDrop={this.onDropFile}
                showOverlay={true}
                overlayMessage={'Drop files here to add them to your image library'}
              >
                <ImageLibraryList
                  items={this.props.items}
                  onSelect={this.onSelectImage}
                  onDelete={this.deleteItem}
                />
              </DragAndDropTarget>
            </div>
          </DialogContent>
        </Paper>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DialogInsertImage as any));
