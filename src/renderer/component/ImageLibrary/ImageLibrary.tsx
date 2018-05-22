import * as React from 'react';
import { IStyle } from 'type/materialUI';
import { Paper, withStyles } from '@material-ui/core/';
import { TypeBackground } from '@material-ui/core/styles/createPalette';
import { DragAndDropTarget } from './DragAndDropTarget';
import { ImageLibraryListComponent } from './ImageLibraryList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getImagesRequest, uploadImagesRequest, deleteImagesRequest, updateImageRequest } from
    'src/renderer/component/ImageLibrary/store/actions';
import { getImagesURLSelector } from 'src/renderer/component/ImageLibrary/store/selectors';
import { IImageLibraryItem } from 'src/renderer/component/ImageLibrary/store/models';
import 'src/renderer/component/ImageLibrary/ImageLibrary.scss';
import block from 'bem-ts';
import { ImageLibraryDialog } from 'src/renderer/component/ImageLibrary/ImageLibraryDialog';
import Button from '@material-ui/core/Button';

const b = block('image-library');

namespace ImageLibrarySpace {
  export interface IProps {
    classes?: any;
    actions?: {
      getImagesRequest: typeof getImagesRequest,
      uploadImagesRequest: typeof uploadImagesRequest,
      deleteImagesRequest: typeof deleteImagesRequest,
      updateImageRequest: typeof updateImageRequest,
    };
    items: IImageLibraryItem[];
  }
  export interface IState {
    openDialog: boolean;
    chosenImage: IImageLibraryItem;
  }
}

const styles: IStyle = theme => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  }
});

const mapStateToProps = state => ({
  items: getImagesURLSelector(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getImagesRequest, uploadImagesRequest, deleteImagesRequest, updateImageRequest }, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class ImageLibrary extends React.Component<ImageLibrarySpace.IProps, ImageLibrarySpace.IState> {
  constructor (props) {
    super(props);
    this.state = { openDialog:false, chosenImage: null };
  }

  componentDidMount () {
    this.props.actions.getImagesRequest();
  }

  onDropFile = item => {
    if (item && item.files) {
      this.props.actions.uploadImagesRequest(item.files);
    }
  }

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
  }

  openDialog = (item:IImageLibraryItem) => () => {
    this.setState({openDialog: true, chosenImage: item});
  }

  closeDialog = () => {
    this.setState({openDialog: false, chosenImage: null});
  }

  deleteItem = (item:IImageLibraryItem) => () => {
    this.props.actions.deleteImagesRequest(item.id);
  }

  updateItem = (item:IImageLibraryItem, name) => {
    this.props.actions.updateImageRequest({ imageId: item.id, name });
  }

  // TODO implement onProgress

  render() {
    const { classes } = this.props;
    return (
      <Paper elevation={4} className={classes.root}>
        <div className={b()}>
          <DragAndDropTarget
            onDrop={this.onDropFile}
            showOverlay={true}
            overlayMessage={'Drop files here to add them to your image library'}
          >
            <div className={b('container')}>
              {this.state.chosenImage ?
                <ImageLibraryDialog
                  item={this.state.chosenImage}
                  onDeleteItem={this.deleteItem}
                  onUpdateItem={this.updateItem}
                  onClose={this.closeDialog}
                /> :
                null
              }
              <ImageLibraryListComponent
                items={this.props.items}
                onDelete={this.deleteItem}
                onOpenDialog={this.openDialog}
              />
            </div>
          </DragAndDropTarget>
          <div className={b('footer')}>
            <Button color="primary">
              <label htmlFor='upload'>
                Upload images
              </label>
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
    );
  }
}

export default withStyles(styles)(ImageLibrary as any);
