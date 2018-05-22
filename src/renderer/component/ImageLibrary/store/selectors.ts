import { createSelector } from 'reselect';
import { IFileInfo, IImageLibraryItem, IPagination } from 'src/renderer/component/ImageLibrary/store/models';

const imagesSelector = (state):IFileInfo[] => state.images.all;
const paginationSelector = (state):IPagination => state.images.pagination;

export const getCurrentPageSelector = createSelector(
  paginationSelector,
  (state:IPagination): number =>
    state.current_page
);

export const getTotalImages = createSelector(
  paginationSelector,
  (state:IPagination): number =>
    state.total
);

export const getLastPageSelector = createSelector(
  paginationSelector,
  (state:IPagination): number =>
    state.last_page
);

export const getPerPageSelector = createSelector(
  paginationSelector,
  (state:IPagination): number =>
    state.per_page
);

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
