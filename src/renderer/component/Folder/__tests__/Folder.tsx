import * as React from 'react';
import { shallow } from 'enzyme';
import { Folder } from '../Folder';

describe('<Folder>', () => {
  const render = shallow(<Folder/>);
  test('Render UI', () => {
    expect(render).toMatchSnapshot();
  });
});
