import * as React from 'react';
import { shallow } from 'enzyme';
import { Polls } from '../Polls';

describe('Polls', () => {
  const render = shallow(<Polls/>);
  test('Render UI', () => {
    expect(render).toMatchSnapshot();
  });
});
