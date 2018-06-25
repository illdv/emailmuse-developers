import * as React from 'react';
import { compose } from 'redux';
import { mount, shallow } from 'enzyme';
import { ImageLibraryList } from '../ImageLibraryList';
import { mockImage0, mockImageArray } from '../__mock__/mock';

describe('<ImageLibraryList /> UI Component', () => {
  const selectImg = jest.fn();
  const deleteImg = jest.fn();
  const props = {
    items: [...mockImageArray],
    onDelete: deleteImg,
    onSelect: selectImg,
  };
  describe('Rendering UI', () => {
    it('Renders Correctly', () => {
      compose(expect, shallow)(<ImageLibraryList {...props} />).toMatchSnapshot();
    });

    it('Defaults Properties correctly', () => {
      const initProps = {
        items: [],
        onDelete: jest.fn(),
        onSelect: jest.fn(),
      };
      expect(shallow(<ImageLibraryList {...initProps} />));
    });
  });
  describe('User interacts', () => {
    const imageList = mount(<ImageLibraryList {...props} />);

    afterAll(() => { imageList.unmount(); });

    describe('Selecting a img', () => {
      imageList.find('.image-library-list__tile-img')
        .first()
        .simulate('click');

      it('must dispatch selectTemplate', () => {
        expect(selectImg).toBeCalled();
      });

      it('selectTemplate take image', () => {
        expect(selectImg).toBeCalledWith(mockImage0);
      });

    });

    describe('Clicking delete button', () => {
      imageList
        .find('IconButton')
        .first()
        .simulate('click');

      it('must dispatch onDelete', () => {
        expect(deleteImg).toBeCalled();
      });

      it('onDelete take image', () => {
        expect(deleteImg).toBeCalledWith(mockImage0);
      });

    });
  });
});
