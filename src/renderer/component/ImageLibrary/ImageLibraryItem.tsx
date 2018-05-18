import * as React from 'react';

import 'src/renderer/component/ImageLibrary/ImageLibraryItem.scss';
import block from 'bem-ts';

const b = block('image-library-item');

export interface ImageLibraryItem {
  url: string;
}

namespace ImageLibraryItemSpace {
  export interface IProps {
    url: string;
  }
}

export const ImageLibraryItemComponent: React.StatelessComponent<ImageLibraryItemSpace.IProps> =
  (props: ImageLibraryItemSpace.IProps) => {
  const { url } = props;
  return (
    <div className={b()}>
      <img className={b('img')} src={url} onClick={()=>console.log('Yolo!')}/>
    </div>
  );
};
