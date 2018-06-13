import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { ImageLibrary as ImageLibrary } from '../ImageLibrary';
import { Provider } from 'react-redux';
import { deleteImagesRequest, getImagesRequest, updateImageRequest, uploadImagesRequest } from '../store/actions';
import { mockImage0, mockImageArray } from '../__mock__/mock';

describe('ImageLibrary', () => {
  describe('>>>initialization', () => {
    let initialState;
    let imageLibraryInitial;
    // let mountedImageLibrary;
    const mockGetImagesRequest = jest.fn();

    beforeEach(() => {
      initialState = {
        items: [],
        pagination: {
          current_page: 1,
          last_page: 3,
          per_page: 15,
          total: 40,
        },
        classes: { root: 'lib' },
        actions: {
          getImagesRequest: mockGetImagesRequest,
          uploadImagesRequest,
          deleteImagesRequest,
          updateImageRequest,
        },
      };
      imageLibraryInitial = shallow(<ImageLibrary {...initialState} />);
      // mountedImageLibrary = mount(<ImageLibrary {...initialState} />);

    });
    // afterEach(() => {
    //   mountedImageLibrary.unmount();
    // });

    it('render ImageLibrary component', () => {
      expect(imageLibraryInitial).toMatchSnapshot();
    });

    // //it doesnt work because context is lost
    // it('should call fetch when mounted', () => {
    //
    //   expect(mountedImageLibrary).toBeDefined();
    //   expect(mockGetImagesRequest).toHaveBeenCalled();
    // });
  });

  describe('ImageLibrary handle event', () => {
    let props; let imageLibrary;
    const mockGetImagesRequest    = jest.fn();
    const mockUploadImagesRequest = jest.fn();
    const mockUpdateImageReturned  = jest.fn();
    const mockDeleteImagesRequest = jest.fn().mockReturnValue(mockUpdateImageReturned);
    const mockUpdateImageRequest  = jest.fn();
    beforeEach(() => {
    props  = {
      items: mockImageArray,
      pagination: {
        current_page: 1,
        last_page: 3,
        per_page: 15,
        total: 39,
      },
      classes: { root: 'lib' },
      actions: {
        getImagesRequest: mockGetImagesRequest,
        uploadImagesRequest: mockUploadImagesRequest,
        deleteImagesRequest: mockDeleteImagesRequest,
        updateImageRequest: mockUpdateImageRequest,
      },
    };
    imageLibrary = shallow(<ImageLibrary {...props} />) as any;
    });

    it('onDeleteItem method from ImageLibraryList or ImageLibraryDialog', () => {
      imageLibrary.instance().deleteItem(mockImage0)();
      expect(mockDeleteImagesRequest).toBeCalledWith(mockImage0.id);
    });

    it('onSelect method from ImageLibraryList ', () => {
      imageLibrary.instance().onOpenImageInfo(mockImage0)();
      expect(imageLibrary.state().openDialog).toBe(true);
      expect(imageLibrary.state().chosenImage).toEqual(mockImage0);
    });

    it('onUpdateItem method from ImageLibraryDialog', () => {
      const testName = 'newNameForImage';
      imageLibrary.instance().updateItem(mockImage0, testName);
      expect(mockUpdateImageRequest).toBeCalledWith({imageId: mockImage0.id, name: testName});
    });

    it('closeDialog method from ImageLibraryDialog', () => {
      imageLibrary.instance().closeDialog();
      expect(imageLibrary.state().openDialog).toBe(false);
      expect(imageLibrary.state().chosenImage).toBe(null);
    });
  });
});
