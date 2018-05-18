import * as React from 'react';
import block from 'bem-ts';
import {GridList, GridListTile, GridListTileBar} from '@material-ui/core/';
import {IFileInfo} from "./ImageLibrary";
const b = block('image-library-list');
import 'src/renderer/component/ImageLibrary/ImageLibraryList.scss';

namespace ImageLibraryListSpace {
  export interface IProps {
    items: IFileInfo[];
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
          </GridListTile>
        )}
      </GridList>
    );
  }
}
