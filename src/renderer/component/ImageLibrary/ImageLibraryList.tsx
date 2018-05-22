import * as React from 'react';
import {GridList, GridListTile, GridListTileBar} from '@material-ui/core';
import 'src/renderer/component/ImageLibrary/ImageLibraryList.scss';
import block from 'bem-ts';
import { IImageLibraryItem } from 'src/renderer/component/ImageLibrary/store/models';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { ImageLibraryDialog } from 'src/renderer/component/ImageLibrary/ImageLibraryDialog';

const b = block('image-library-list');

namespace ImageLibraryListSpace {
  export interface IProps {
    items: IImageLibraryItem[];
    onDelete?: (id) => void;
    onUpdate?: (id, name) => void;
  }
  export interface IState {
    openDialog: boolean;
    chosenImage: IImageLibraryItem;
  }
}

export class ImageLibraryListComponent extends
  React.Component<ImageLibraryListSpace.IProps, ImageLibraryListSpace.IState> {

  constructor(props){
    super(props);
    this.state = { openDialog: false, chosenImage: null };
  }

  handleEditOpen = (item:IImageLibraryItem) => () => {
    this.setState({ openDialog: true, chosenImage: item });
  }

  handleEditClose = () => {
    this.setState({ openDialog: false, chosenImage: null });
  }

  handleDelete = (item:IImageLibraryItem) => () => {
    this.props.onDelete(item.id);
  }

  render() {
    return (
      <>
        {this.state.chosenImage ?
          <ImageLibraryDialog
            item={this.state.chosenImage}
            onDelete={this.props.onDelete}
            onUpdate={this.props.onUpdate}
            onClose={this.handleEditClose}
          /> :
          null
        }
        <GridList
          className={b()}
          cols={3}
          spacing={20}
        >
          {this.props.items.map(item =>
            <GridListTile
              className={b('tile')}
              key={item.id}
            >
              <img
                src={item.url}
                onClick={this.handleEditOpen(item)}
                className={b('tile-img')}
              />
              <GridListTileBar
                title={item.name}
                actionIcon={
                  <IconButton onClick={this.handleDelete(item)}>
                    <Delete nativeColor='white'/>
                  </IconButton>
                }
              />
            </GridListTile>
          )}
        </GridList>
      </>
    );
  }
}
