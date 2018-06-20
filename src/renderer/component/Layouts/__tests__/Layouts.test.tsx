import * as React from 'react';
import { shallow } from 'enzyme';
import { Layouts } from 'src/renderer/component/Layouts/Layouts';

const mockTemplate =  {
  id: null,
  user_id: 0,
  updated_at: '',
  description: 'Description',
  title: 'Template',
  body: '<div>Test</div>',
  created_at: '',
  deleted_at: '',
};

describe.skip('Layouts', () => {
  const create = jest.fn() as any;
  const props = { actions: {select: create} };
  const layouts = shallow(<Layouts {...props} />);

  test('Render UI', () => {
    expect(layouts).toMatchSnapshot();
  });
});
