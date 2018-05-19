import * as React from 'react';
import {GridList, GridListTile, GridListTileBar} from '@material-ui/core';
import 'src/renderer/component/ImageLibrary/ImageLibraryList.scss';
import block from 'bem-ts';

const b = block('image-library-list');

namespace ImageLibraryListSpace {
  export interface IProps {
    items: File[];
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
            key={item.name}
          >
            <img src={item.name}/>
            <GridListTileBar
              title={item.name}
              subtitle={<span>{new Date(item.lastModified).toDateString()}</span>}
            />
          </GridListTile>
        )}
      </GridList>
    );
  }
}
