import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { Emails } from 'src/renderer/component/Emails/Emails';
import { ActionStatus } from 'src/renderer/flux/interface';
import { emailToEditEntity } from 'src/renderer/component/Emails/utils';
import {
  IEmail,
  nodeType,
} from 'src/renderer/component/Emails/flux/interfaceAPI';
import { RootMock } from 'src/renderer/__mock__/rootMock';
import toJson from 'enzyme-to-json';

// jest.mock('../../../src/components/ui/ColorList');

const EmailMock = props => (
  <RootMock>
    <Emails {...props} />
  </RootMock>
);

describe('<Emails/>', () => {
  let props;
  const selectedTemplate: IEmail = {
    id: 1,
    user_id: 1,
    title: 'test title',
    type: nodeType.email,
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
    folder_id: 0,
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
  const mockSelectEmail = jest.fn();
  const mockRemoveEmail = jest.fn();
  const mockSaveEmail = jest.fn();
  const mockCreateEmail = jest.fn();
  const mockCopyTemplate = jest.fn();
  const mockLoadingTemplate = jest.fn();
  const asyncActionObject = {
    REQUEST: jest.fn(),
    SUCCESS: jest.fn(),
    FAILURE: jest.fn(),
  };

  beforeEach(() => {
    props = {
      emails: {
        status: '',
        emails: {},
        selectedTemplate: null,
      },
      folders: [],
      editorActions: {
        edit: asyncActionObject,
        save: asyncActionObject,
        close: asyncActionObject,
        remove: asyncActionObject,
        saveAndClose: asyncActionObject,
      },
      foldersActions: {
        showModal: jest.fn(),
        createFolder: jest.fn(),
        updateFolder: jest.fn(),
        deleteFolder: jest.fn(),
        getFolders: jest.fn(),
      },
      emailsActions: {
        loading: jest.fn(),
        remove: mockRemoveEmail,
        save: mockSaveEmail,
        create: mockCreateEmail,
        select: mockSelectEmail,
        failure: jest.fn(),
        copy: jest.fn(),
        createSuccess: jest.fn(),
        selectNewTemplate: jest.fn(),
        getEmailFromFolder: jest.fn(),
      },
    };
  });

  test('Waite initialize', () => {
    // spinner rotates
    props.emails.status = ActionStatus.REQUEST;
    const render = shallow(
      <RootMock>
        <Emails {...props} />
      </RootMock>,
    );

    expect(toJson(render)).toMatchSnapshot();
  });

  test('Couldn\'t download the templates', () => {
    props.emails.status = ActionStatus.FAILURE;
    const render = shallow(<EmailMock {...props} />);

    expect(render).toMatchSnapshot();
  });

  test('User click on button "Add a new email"', () => {
    props.emails.selectedEmail = undefined;
    const render = shallow(
      <RootMock>
        <Emails {...props} />
      </RootMock>,
    );

    render.find('Fab').simulate('click');

    expect(mockSelectEmail).toBeCalled();
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
        emails: arrayTemplates,
        selectedTemplate: null,
      };
    });
    test('show list', () => {
      const render = mount(<EmailMock {...props} />);

      expect(render).toMatchSnapshot();
    });
    test('change page', () => {
      const page = 1;
      const render = shallow(<Emails {...props} />) as any;
      render.instance().onChangePage('e', page);

      expect(mockLoadingTemplate).toBeCalled();
      expect(mockLoadingTemplate).toBeCalledWith({ page: page + 1 });
    });

    test('User click on template item row', () => {
      const render = shallow(<EmailMock {...props} />) as any;
      render.instance().selectNode(selectedTemplate)();
      const mockEmailToEditEntity = emailToEditEntity(selectedTemplate);

      expect(props.editorActions.edit.REQUEST).toBeCalled();
      expect(props.editorActions.edit.REQUEST).toBeCalledWith(
        mockEmailToEditEntity,
      );
    });
    test('User click on copy icon', () => {
      const id = 1; // template ids
      const render = shallow(<EmailMock {...props} />) as any;
      render.instance().onCopy(id);

      expect(mockCopyTemplate).toBeCalled();
      expect(mockCopyTemplate).toBeCalledWith({ id });
    });
  });
  describe('Wen user select template', () => {
    let render;
    beforeEach(() => {
      props.emails.selectedEmail = selectedTemplate;
      render = shallow(<EmailMock {...props} />);
    });
    it('user select template', () => {
      expect(props.emails.selectedTemplate).toEqual(selectedTemplate);
      expect(render).toMatchSnapshot();
    });
    /* it('user click close button', () => {
       render.instance().onClose();
       expect(mockSelectEmail).toBeCalledWith(null);
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

      render = shallow(<Emails {...props} />);
    });
    it('user click remove button', () => {
      render.instance().onCloseOrRemove();
      expect(mockSelectEmail).toBeCalledWith(null);
    });
    it('user click save button', () => {
      render.instance().onSaveOrCreate(selectedTemplate, false);

      expect(mockCreateTemplate).toBeCalledWith(selectedTemplate);
    });
  });*/
});

// Todo: test: componentDidMount
