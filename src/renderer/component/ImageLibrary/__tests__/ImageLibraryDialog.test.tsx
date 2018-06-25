import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { mockImage0 } from '../__mock__/mock';
import { ImageLibraryDialog } from 'src/renderer/component/ImageLibrary/ImageLibraryDialog';
import { ToastType } from 'src/renderer/common/Toast/flux/actions';

describe('<ImageLibraryDialog />', () => {
  let dialog;
  let props;
  const mockClose              = jest.fn();
  const mockUpdateItem         = jest.fn();
  const mockDeleteItemReturned = jest.fn();
  const mockDeleteItem         = jest.fn().mockReturnValue(() => mockDeleteItemReturned);
  const mockShowToast = jest.fn();

  beforeAll(() => {
    props  = {
      item: mockImage0,
      onUpdateItem: mockUpdateItem,
      onDeleteItem: mockDeleteItem,
      onClose: mockClose,
      onShowToast: mockShowToast,
    };
    dialog = shallow(<ImageLibraryDialog {...props} />);
  });

  describe('Rendering UI', () => {
    it('Renders Correctly', () => {
      expect(dialog).toMatchSnapshot();
    });
  });

  describe('User interact with dialog,', () => {
    const typedValue = 'New name';
    beforeAll(() => {
      props  = {
        item: mockImage0,
        onUpdateItem: mockUpdateItem,
        onDeleteItem: mockDeleteItem,
        onClose: mockClose,
        onShowToast: mockShowToast,
      };
      dialog = shallow(<ImageLibraryDialog {...props} />);
    });

    it('he click on the inputName and types text', () => {
      dialog
        .find('.image-library-dialogs__inputName')
        .simulate('change', { target: { value: typedValue } });

      expect(dialog.state().newName).toBe(typedValue);
    });

    it('he submit the form', () => {
      dialog
        .find('.image-library-dialogs__inputName')
        .simulate('change', { target: { value: typedValue } });
      dialog.find('form')
        .simulate('submit', { preventDefault() {} });

      expect(mockUpdateItem).toBeCalledWith(props.item, typedValue);
    });

    describe('he click on the inputURL', () => {
      let mountedDialog;
      beforeEach(() => {
        Object.defineProperty(window.document, 'execCommand', {
          writable: true,
          value: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false),
        });
        props         = {
          item: mockImage0,
          onUpdateItem: mockUpdateItem,
          onDeleteItem: mockDeleteItem,
          onClose: mockClose,
          onShowToast: mockShowToast,
        };
        mountedDialog = mount(<ImageLibraryDialog {...props} />);
        mountedDialog
          .find('.image-library-dialogs__inputURL')
          .first()
          .simulate('click', { preventDefault() {} })
          .simulate('click', { preventDefault() {} });
      });
      afterAll(() => {
        mountedDialog.unmount();
      });

      test('URL copied to clipboard', () => {
        expect(mockShowToast.mock.calls[0][1]).toBe(ToastType.Success);
      });

      test('URL did not copied to clipboard', () => {
        expect(mockShowToast.mock.calls[1][1]).toBe(ToastType.Error);
      });
    });

    it('he click delete button', () => {
      dialog.find('.image-library-dialogs__button--delete').simulate('click');

      expect(mockDeleteItem).toBeCalledWith(mockImage0);
      expect(mockClose).toBeCalled();
    });

    it('he close up the form', () => {
      dialog.instance().handleDialogClose();

      expect(mockClose).toBeCalled();
    });
  });

});
