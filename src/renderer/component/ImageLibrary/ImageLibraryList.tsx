import * as React from 'react';
import {GridList, GridListTile, GridListTileBar} from '@material-ui/core';
import 'src/renderer/component/ImageLibrary/ImageLibraryList.scss';
import block from 'bem-ts';
import { IImageLibraryItem } from 'src/renderer/component/ImageLibrary/store/models';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

const b = block('image-library-list');

namespace ImageLibraryListSpace {
  export interface IProps {
    items: IImageLibraryItem[];
    onDelete: (item:IImageLibraryItem) => () => void;
    onOpenDialog: (item:IImageLibraryItem) => () => void;
  }
  export interface IState {

  }
}

export class ImageLibraryListComponent extends
  React.Component<ImageLibraryListSpace.IProps, ImageLibraryListSpace.IState> {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <>
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
                onClick={this.props.onOpenDialog(item)}
                className={b('tile-img')}
              />
              <GridListTileBar
                title={item.name}
                actionIcon={
                  <IconButton onClick={this.props.onDelete(item)}>
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
