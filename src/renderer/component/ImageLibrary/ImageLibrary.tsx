import * as React from 'react';
import { IStyle } from 'type/materialUI';
import { Paper, withStyles } from '@material-ui/core/';
import { TypeBackground } from '@material-ui/core/styles/createPalette';
import { DragAndDropTarget } from './DragAndDropTarget';
import { ImageLibraryListComponent } from './ImageLibraryList';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getImagesRequest } from 'src/renderer/component/ImageLibrary/store/actions';

import 'src/renderer/component/ImageLibrary/ImageLibrary.scss';
import block from 'bem-ts';
const b = block('image-library');

namespace ImageLibrarySpace {
  export interface IProps {
    classes?: any;
    actions?: {
      getImagesRequest: typeof getImagesRequest
    };
  }
  export interface IState {
    items: File[];
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
  // TODO refactor with selectors
  items: state.images.all
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getImagesRequest }, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class ImageLibrary extends React.Component<ImageLibrarySpace.IProps, ImageLibrarySpace.IState> {
  constructor (props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount () {
    this.props.actions.getImagesRequest();
  }

  onDrop = item => {
    if (item && item.files) {
      this.addFiles(item.files);
    }
  }

  onProgress = (percentage) => {
    console.log('Loaded:', percentage);
  }

  // TODO: Should user be prevented from uploading one same image twice
  // and how two images could be identified as 'same'?
  addFiles = files => {
    const filtered = files.filter(file => !this.state.items.some(item => item.name === file.name));
    this.setState({items: [...this.state.items, ...filtered]});
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
              <ImageLibraryListComponent items={this.state.items}/>
            </div>
          </DragAndDropTarget>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(ImageLibrary as any);
