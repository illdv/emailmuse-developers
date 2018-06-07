import * as React from 'react';
import { GridList, GridListTile, GridListTileBar, Grow, IconButton } from '@material-ui/core';
import block from 'bem-ts';

import { IImageLibraryItem } from 'src/renderer/component/ImageLibrary/store/models';
import 'src/renderer/component/ImageLibrary/ImageLibraryList.scss';
import { Delete } from '@material-ui/icons';

const b = block('image-library-list');

namespace ImageLibraryListSpace {
  export interface IProps {
    items: IImageLibraryItem[];
    onDelete?: (item: IImageLibraryItem) => () => void;
    onSelect: (item: IImageLibraryItem) => () => void;
  }

  export interface IState {

  }
}

export class ImageLibraryList extends React.Component<ImageLibraryListSpace.IProps, ImageLibraryListSpace.IState> {

  constructor(props) {
    super(props);
  }

  render() {
    const { onDelete, onSelect, items } = this.props;
    return (
      <>
        <GridList
          cellHeight={240}
          cols={3}
          className={b()}
        >
          {
            items.map((item, index) => (
                <Grow key={item.id} in timeout={(index * 500) + 500}>
                  <GridListTile className={b('tile')}>
                    <img
                      className={b('tile-img')}
                      src={item.thumb_url}
                      onClick={onSelect(item)}
                    />
                    {
                      onDelete &&
                      <GridListTileBar
                        title={item.name}
                        actionIcon={
                          <IconButton onClick={onDelete(item)}>
                            <Delete nativeColor='white'/>
                          </IconButton>
                        }
                      />
                    }
                  </GridListTile>
                </Grow>
              ),
            )
          }
        </GridList>
      </>
    );
  }
}
