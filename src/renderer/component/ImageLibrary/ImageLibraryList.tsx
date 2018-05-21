import * as React from 'react';
import {GridList, GridListTile, GridListTileBar} from '@material-ui/core';
import 'src/renderer/component/ImageLibrary/ImageLibraryList.scss';
import block from 'bem-ts';
import { IImageLibraryItem } from 'src/renderer/component/ImageLibrary/store/models';

const b = block('image-library-list');

namespace ImageLibraryListSpace {
  export interface IProps {
    items: IImageLibraryItem[];
  }
  export interface IState {

  }
}

export class ImageLibraryListComponent extends
  React.Component<ImageLibraryListSpace.IProps, ImageLibraryListSpace.IState> {
  render() {
    return (
      <GridList
        className={b()}
        cols={3}
        spacing={20}
      >
        {this.props.items.map(item =>
          <GridListTile
            key={item.id}
          >
            <img src={item.url}/>
            <GridListTileBar
              title={item.name}
              // subtitle={<span>{new Date(item.name).toDateString()}</span>}
            />
          </GridListTile>
        )}
      </GridList>
    );
  }
}
