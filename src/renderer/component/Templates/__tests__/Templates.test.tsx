import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { Templates } from 'src/renderer/component/Templates/Templates';
import { ActionStatus } from 'src/renderer/flux/interface';
import { emailToEditEntity } from 'src/renderer/component/Templates/utils';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';

describe('<Templates/>', () => {
  let props;
  const selectedTemplate: ITemplate = {
    id: '1',
    user_id: 1,
    title: 'test title',
    description: 'test description',
    body: `<table style="width: 453px; height: 45px;">
           <tbody>
           <tr>
               <td>Left Test</td>
            </tr>
         </tbody>
      </table>`,
    created_at: '',
    updated_at: '',
    deleted_at: '',
  };
  const emptyTemplate = {
    id: null,
    user_id: 0,
    updated_at: '',
    description: '',
    title: 'Template',
    body: '',
    created_at: '',
    deleted_at: '',
  };
  const arrayTemplates = [selectedTemplate, emptyTemplate];
  const mockSelectTemplate = jest.fn();
  const mockRemoveTemplate = jest.fn();
  const mockSaveTemplate = jest.fn();
  const mockCreateTemplate = jest.fn();
  const mockCopyTemplate = jest.fn();
  const mockLoadingTemplate = jest.fn();
  const asyncActionOnject = {
    REQUEST: jest.fn(),
    SUCCESS: jest.fn(),
    FAILURE: jest.fn(),
  };

  beforeEach(() => {
    props = {
      templates: {
        status: '',
        pagination: {},
        templates: {},
        selectedTemplate: null,
      },
      editorActions: {
        edit: asyncActionOnject,
        save: asyncActionOnject,
        close: asyncActionOnject,
        remove: asyncActionOnject,
        saveAndClose: asyncActionOnject,
      },
      action: {
        loading: mockLoadingTemplate,
        remove: mockRemoveTemplate,
        save: mockSaveTemplate,
        create: mockCreateTemplate,
        select: jest.fn(),
        copy: mockCopyTemplate,
        failure: jest.fn(),
        successfully: jest.fn(),
        createSuccess: jest.fn(),
        selectNewTemplate: mockSelectTemplate,
      },
      onShowToast: jest.fn(),
      newTemplate: {},
    };
  });

  test('Waite initialize', () => {
    // spinner rotates
    props.templates.status = ActionStatus.REQUEST;
    const render = shallow(<Templates {...props} />);

    expect(render).toMatchSnapshot();
  });

  test('Couldn\'t download the templates', () => {
    props.templates.status = ActionStatus.FAILURE;
    const render = shallow(<Templates {...props} />);

    expect(render).toMatchSnapshot();
  });

  test('User click on button "Add a new email"', () => {
    props.templates.selectedTemplate = undefined;
    const render = shallow(<Templates {...props} />);
    render.find('Fab').simulate('click');

    expect(mockSelectTemplate).toBeCalled();
  });
  describe('Render template list', () => {
    beforeEach(() => {
      props.templates = {
        status: 'SUCCESS',
        pagination: {
          current_page: 1,
          last_page: 7,
          per_page: 15,
          total: 2,
        },
        templates: arrayTemplates,
        selectedTemplate: null,
      };
    });
    test('show list', () => {
      const render = mount(<Templates {...props} />);

      expect(render).toMatchSnapshot();
    });
    test('change page', () => {
      const page = 1;
      const render = shallow(<Templates {...props} />) as any;
      render.instance().onChangePage('e', page);

      expect(mockLoadingTemplate).toBeCalled();
      expect(mockLoadingTemplate).toBeCalledWith({ page: page + 1 });
    });

    test('User click on template item row', () => {
      const render = shallow(<Templates {...props} />) as any;
      render.instance().selectTemplate(selectedTemplate)();
      const mockEmailToEditEntity = emailToEditEntity(selectedTemplate);

      expect(props.editorActions.edit.REQUEST).toBeCalled();
      expect(props.editorActions.edit.REQUEST).toBeCalledWith(mockEmailToEditEntity);
    });
    test('User click on copy icon', () => {
      const id = 1;  // template ids
      const render = shallow(<Templates {...props} />) as any;
      render.instance().onCopy(id);

      expect(mockCopyTemplate).toBeCalled();
      expect(mockCopyTemplate).toBeCalledWith({ id });
    });

  });
  describe('Wen user select template', () => {
    let render;
    beforeEach(() => {
      props.templates.selectedTemplate = selectedTemplate;
      render = shallow(<Templates {...props} />);
    });
    it('user select template', () => {
      expect(props.templates.selectedTemplate).toEqual(selectedTemplate);
      expect(render).toMatchSnapshot();
    });
    /* it('user click close button', () => {
       render.instance().onClose();
       expect(mockSelectTemplate).toBeCalledWith(null);
     });*/

    /*it('user click remove button', () => {
      // if it current template
      const id = props.templates.selectedTemplate.id; // 1
      render.instance().onCloseOrRemove();
      expect(mockRemoveTemplate).toBeCalledWith(id);
    });*/
    /* it('user click save button', () => {
       // if it current template
       // props.templates.selectedTemplate.ids != false
       render.instance().onSaveOrCreate(selectedTemplate, false);

       expect(mockSaveTemplate).toBeCalledWith({ template: selectedTemplate, saveAndClose: false });
     });*/
  });

  /*describe('If it new template', () => {
    // another case when  selectedTemplate.ids = false
    let render;
    beforeEach(() => {
      props.templates.selectedTemplate = selectedTemplate;
      props.templates.selectedTemplate.ids = undefined;

      render = shallow(<Templates {...props} />);
    });
    it('user click remove button', () => {
      render.instance().onCloseOrRemove();
      expect(mockSelectTemplate).toBeCalledWith(null);
    });
    it('user click save button', () => {
      render.instance().onSaveOrCreate(selectedTemplate, false);

      expect(mockCreateTemplate).toBeCalledWith(selectedTemplate);
    });
  });*/

});

// Todo: test: componentDidMount
