import * as React from 'react';
import LayoutCard from 'src/renderer/component/Layouts/Layout/LayoutCard';
import { shallow } from 'enzyme';

describe.skip('Layout Card', () => {
  const layoutCard = shallow(<LayoutCard/>);
  test('Render UI', () => {
    expect(layoutCard).toMatchSnapshot();
  });
});
