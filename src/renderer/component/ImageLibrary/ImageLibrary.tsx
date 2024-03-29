import * as React from 'react';
import { IStyle } from 'type/materialUI';
import { Fade, Paper, withStyles } from '@material-ui/core/';
import { TypeBackground } from '@material-ui/core/styles/createPalette';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import block from 'bem-ts';

import {
  deleteImagesRequest,
  getImagesRequest,
  updateImageRequest,
  uploadImagesRequest,
} from 'src/renderer/component/ImageLibrary/store/actions';
import {
  getCurrentPageSelector,
  getImagesURLSelector,
  getLastPageSelector,
  getPerPageSelector,
  getTotalImages,
} from 'src/renderer/component/ImageLibrary/store/selectors';
import { IImageLibraryItem } from 'src/renderer/component/ImageLibrary/store/models';
import 'src/renderer/component/ImageLibrary/ImageLibrary.scss';
import ImageLibraryDialog from 'src/renderer/component/ImageLibrary/ImageLibraryDialog';
import { ImageLibraryList } from './ImageLibraryList';
import { DragAndDropTarget } from './DragAndDropTarget';
import { IPagination } from 'src/renderer/common/List/interface';
import { Search } from 'src/renderer/common/Search';
import { PreLoaderLayout } from 'src/renderer/common/PreloaderLayout/PreLoaderLayout';
import { classNamesImage } from 'src/renderer/component/Tutorial/steps/image';

const b = block('image-library');

namespace ImageLibrarySpace {
  export interface IProps {
    classes?: { root };
    actions?: {
      getImagesRequest: typeof getImagesRequest;
      uploadImagesRequest: typeof uploadImagesRequest;
      deleteImagesRequest: typeof deleteImagesRequest;
      updateImageRequest: typeof updateImageRequest;
    };
    items: IImageLibraryItem[];
    pagination: IPagination;
  }

  export interface IState {
    openDialog: boolean;
    chosenImage: IImageLibraryItem;
    searchWorld: string;
  }
}

const styles: IStyle = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

export class ImageLibrary extends React.Component<
  ImageLibrarySpace.IProps,
  ImageLibrarySpace.IState
> {
  state: ImageLibrarySpace.IState = {
    openDialog: false,
    searchWorld: '',
    chosenImage: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getImagesRequest(1);
  }

  onDropFile = item => {
    if (item && item.files) {
      this.props.actions.uploadImagesRequest(item.files);
    }
  };

  onUploadFiles = e => {
    if (e.target.files) {
      let files = [];
      // tslint:disable-next-line
      for (let i = 0; i < e.target.files.length; i++) {
        files = files.concat(e.target.files[i]);
      }
      if (files.length) {
        this.props.actions.uploadImagesRequest(files);
      }
    }
  };

  onOpenImageInfo = (item: IImageLibraryItem) => () => {
    this.setState({ openDialog: true, chosenImage: item });
  };

  closeDialog = () => {
    this.setState({ openDialog: false, chosenImage: null });
  };

  deleteItem = (item: IImageLibraryItem) => () => {
    this.props.actions.deleteImagesRequest(item.id);
  };

  updateItem = (item: IImageLibraryItem, name) => {
    this.props.actions.updateImageRequest({ imageId: item.id, name });
  };

  onChangePage = (e, page) => {
    this.props.actions.getImagesRequest(page + 1);
  };

  onLoading = (searchWorld: string) => {
    this.props.actions.getImagesRequest(1, searchWorld);
  };

  render() {
    const { classes, pagination } = this.props;
    return (
      <Fade in timeout={1000}>
        <Paper elevation={4} className={classes.root}>
          <div className={b()}>
            <Search search={this.onLoading} />
            <TablePagination
              component='div'
              count={pagination.total || 0}
              rowsPerPage={pagination.per_page || 0}
              rowsPerPageOptions={[15]}
              page={pagination.current_page - 1}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.onChangePage}
            />
            <DragAndDropTarget
              onDrop={this.onDropFile}
              showOverlay={true}
              overlayMessage={
                'Drop files here to add them to your image library'
              }
            >
              <div className={b('container')}>
                {this.state.chosenImage && (
                  <ImageLibraryDialog
                    item={this.state.chosenImage}
                    onDeleteItem={this.deleteItem}
                    onUpdateItem={this.updateItem}
                    onClose={this.closeDialog}
                  />
                )}
                <PreLoaderLayout />
                <ImageLibraryList
                  items={this.props.items}
                  onDelete={this.deleteItem}
                  onSelect={this.onOpenImageInfo}
                />
              </div>
            </DragAndDropTarget>
            <div className={b('footer')}>
              <Button color='primary' className={classNamesImage.UPLOAD}>
                <label htmlFor='upload'>Upload images</label>
                <input
                  id='upload'
                  className={b('upload-input')}
                  type='file'
                  multiple
                  onChange={this.onUploadFiles}
                />
              </Button>
            </div>
          </div>
        </Paper>
      </Fade>
    );
  }
}

const mapStateToProps = state => ({
  items: getImagesURLSelector(state),
  pagination: {
    current_page: getCurrentPageSelector(state),
    total: getTotalImages(state),
    last_page: getLastPageSelector(state),
    per_page: getPerPageSelector(state),
  },
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getImagesRequest,
      uploadImagesRequest,
      deleteImagesRequest,
      updateImageRequest,
    },
    dispatch,
  ),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ImageLibrary as any),
);
