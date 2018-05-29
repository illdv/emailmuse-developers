import * as React from 'react';
import { GridList, GridListTile, GridListTileBar, Grow, IconButton } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import block from 'bem-ts';

import { IImageLibraryItem } from 'src/renderer/component/ImageLibrary/store/models';
import 'src/renderer/component/ImageLibrary/ImageLibraryList.scss';

const b = block('image-library-list');

namespace ImageLibraryListSpace {
  export interface IProps {
    items: IImageLibraryItem[];
    onDelete?: (item: IImageLibraryItem) => () => void;
    onSelect: (item: IImageLibraryItem) => () => void;
    showTitle?: boolean;
  }

  export interface IState {

  }
}

export class ImageLibraryList
  extends React.Component<ImageLibraryListSpace.IProps, ImageLibraryListSpace.IState> {

  constructor(props) {
    super(props);
  }

  render() {
    const { onDelete, onSelect, items } = this.props;
    return (
      <>
        <GridList
          cellHeight={100}
          className={b()}
          cols={15}
          spacing={10}
        >
          {
            items.map((item, index) => (
                <Grow key={item.id} in timeout={(index * 500) + 500}>
                  <GridListTile className={b('container-img')}>
                      <img
                        src={item.thumb_url}
                        onClick={onSelect(item)}
                        className={b('tile-img')}
                      />
                    {this.props.showTitle &&
                    <GridListTileBar
                      title={item.name}
                      actionIcon={
                        onDelete && (
                          <IconButton onClick={onDelete(item)}>
                            <Delete nativeColor='white'/>
                          </IconButton>
                        )
                      }
                    />
                    }
                  </GridListTile>
                </Grow>
              ),
            )}
        </GridList>
      </>
    );
  }
}
