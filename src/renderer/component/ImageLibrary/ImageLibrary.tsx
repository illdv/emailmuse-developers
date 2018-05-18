import * as React from 'react';
import { IStyle } from 'type/materialUI';
import { Paper, withStyles } from '@material-ui/core/';
import {TypeBackground} from '@material-ui/core/styles/createPalette';
import { DragAndDropTarget } from './DragAndDropTarget';
import { ImageLibraryListComponent } from './ImageLibraryList';
import EmailerAPI from 'src/renderer/API/EmailerAPI';

import 'src/renderer/component/ImageLibrary/ImageLibrary.scss';
import block from 'bem-ts';

const b = block('image-library');

export interface IFileInfo {
  [keys: string]: any;
}

namespace ImageLibrarySpace {
  export interface IProps {
    classes?: any;
  }
  export interface IState {
    items: IFileInfo[];
  }
}

const styles: IStyle = theme => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  }
});

class ImageLibrary extends React.Component<ImageLibrarySpace.IProps, ImageLibrarySpace.IState> {
  constructor (props) {
    super(props);
    this.state = {
      items: []
    };
  }

  onDrop = item => {
    if (item && item.files) {
      console.log(item.files[0].lastModifiedDate);
      this.addFiles(item.files);
    }
  }

  onProgress = (percentage) => {
    console.log('Loaded:', percentage);
  }

  addFiles = files => {
    const filtered = files.filter(file => !this.state.items.some(item => item.name === file.name));
    this.setState({items: [...this.state.items, ...filtered]});
    // tslint:disable-next-line
    console.log('Files has been added', filtered);

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
          <DragAndDropTarget onDrop={this.onDrop}>
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
