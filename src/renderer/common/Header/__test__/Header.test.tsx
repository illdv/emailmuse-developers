import * as React from 'react';
import { shallow } from 'enzyme';

import HeaderToolbar from 'src/renderer/common/Header/Header';

describe.skip('Header', () => {
  const props = {
    numSelected: 1,
    title: 'Тest title',
  };
  const render = shallow(<HeaderToolbar {...props}/>);
  test('Render UI', () => {
    expect(render).toMatchSnapshot();
  });
});
