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
    // this.state = {
    //   items: []
    // };
  }

  componentDidMount () {
    this.props.actions.getImagesRequest();
  }

  onDrop = item => {
    if (item && item.files) {
      this.props.actions.uploadImagesRequest(item.files);
    }
  }

  // TODO implement onProgress
  // onProgress = (percentage) => {
  //   console.log('Loaded:', percentage);
  // }

  // addFiles = files => {
    // const filtered = files.filter(file => !this.state.images.some(item => item.name === file.name));
    // this.setState({images: [...this.state.images, ...filtered]});
    // tslint:disable-next-line
    // console.log('Files has been added', filtered);

    // const filo = filtered[0];
    // let fileData = new FormData();
    // fileData.append(filo.name, filo.path);

    // EmailerAPI.ImageLibrary.uploadImage(filtered[0], this.onProgress).then(result => {
    //   console.log('Post done', result);
    // });

    // EmailerAPI.ImageLibrary.getImages().then(result => {
    //   console.log('Get done', result);
    // });

    // EmailerAPI.ImageLibrary.updateImage(1, "lol").then(result => {
    //   console.log('Get done', result);
    // });

    // EmailerAPI.ImageLibrary.deleteImages([1,2]).then(result => {
    //   console.log('Get done', result);
    // });
    // filtered[0]
  // }

  onDelete = itemId => () => {
    this.props.actions.deleteImagesRequest(itemId);
  }

  onEdit = (itemId, name) => {
    // console.log(itemId, name);
    this.props.actions.updateImageRequest({ imageId: itemId, name });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper elevation={4} className={classes.root}>
        <div className={b()}>
          <DragAndDropTarget
            onDrop={this.onDrop}
            showOverlay={true}
            overlayMessage={'Drop files here to add them to your image library'}
          >
            <div className={b('container')}>
              <ImageLibraryListComponent
                items={this.props.items}
                onDelete={this.onDelete}
                onEdit={this.onEdit}
              />
            </div>
          </DragAndDropTarget>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(ImageLibrary as any);
