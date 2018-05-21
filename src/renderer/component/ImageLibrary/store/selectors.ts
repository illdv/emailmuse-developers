import { createSelector } from 'reselect';
import { IFileInfo, IImageLibraryItem } from 'src/renderer/component/ImageLibrary/store/models';

const imagesSelector = (state):IFileInfo[] => state.images.all;

export const getImagesURLSelector = createSelector(
  imagesSelector,
  (state: IFileInfo[]): IImageLibraryItem[] =>
    state.map(file => {
      return {
        id: file.id,
        url: file.url,
        name: file.name
      };
    })
);
