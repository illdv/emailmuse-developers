import * as React from 'react';
import { IStyle } from 'type/materialUI';
import { Paper, withStyles } from '@material-ui/core/';
import {TypeBackground} from '@material-ui/core/styles/createPalette';
import { DragAndDropTarget } from './DragAndDropTarget';
import { ImageLibraryListComponent } from './ImageLibraryList';

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
    dragging: boolean;
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
      dragging: false,
      items: []
    };
  }

  onDrag = isOverCurrent => {
    this.setState({dragging: isOverCurrent});
  }

  onDrop = item => {
    this.setState({dragging: false});
    if (item && item.files) {
      console.log(item.files[0].lastModifiedDate);
      this.addFiles(item.files);
    }
  }

  addFiles = files => {
    const filtered = files.filter(file => !this.state.items.some(item => item.name === file.name));
    this.setState({items: [...this.state.items, ...filtered]});
    // tslint:disable-next-line
    console.log('Files has been added', filtered);
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper elevation={4} className={classes.root}>
        <div className={b()}>
          <DragAndDropTarget onDrop={this.onDrop} onDrag={this.onDrag}>
            <div className={b('container', {dragging: this.state.dragging})}>
              <div className={b('placeholder', {dragging: this.state.dragging})}>
                <span>Drop files here to add them to your image library</span>
              </div>
              <ImageLibraryListComponent items={this.state.items}/>
            </div>
          </DragAndDropTarget>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(ImageLibrary as any);
