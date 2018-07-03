/*
import * as React from 'react';
import { shallow } from 'enzyme';
import { Layouts, LayoutsSpace } from 'src/renderer/component/Layouts/Layouts';
import { ITemplateAction } from 'src/renderer/component/Templates/flux/interface';
import { ILayout, ILayoutActions, ILayoutState } from 'src/renderer/component/Layouts/flux/interface';
import { IPagination } from 'src/renderer/common/List/interface';

// const mockTemplate = {
//   id: null,
//   user_id: 0,
//   updated_at: '',
//   description: 'Description',
//   title: 'Template',
//   body: '<div>Test</div>',
//   created_at: '',
//   deleted_at: '',
// };

describe.skip('Layouts', () => {
  const create  = jest.fn() as any;
  const props: LayoutsSpace.IProps   = {
    actions: { select: create },
    actionLayout: {},
    layout: {
      layouts: [
        { title: '', body: '' },
      ],
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 1,
        total: 1,
      },
    },
    showPopUp: false,
  };
  const layouts = shallow(<Layouts {...props} />);

  test('Render UI', () => {
    expect(layouts).toMatchSnapshot();
  });
});
*/
