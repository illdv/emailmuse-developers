import * as React from 'react';
import EntityCard from 'src/renderer/common/List/ListCard/EntityCard';
import { shallow } from 'enzyme';

describe.skip('Auth Card', () => {
  const layoutCard = shallow(<EntityCard/>);
  test('Render UI', () => {
    expect(layoutCard).toMatchSnapshot();
  });
});
