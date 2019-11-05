import React from 'react';
import { shallow } from 'enzyme';

import Navigation from './navigation';

/*
* During test writing you can selectively run just these tests or skip individual ones while you
* work on others https://facebook.github.io/jest/docs/en/api.html#testskipname-fn
*/
describe('<Navigation />', () => {
  describe('checking for component import errors', () => {
    it('should be in the components directory', () => {
      expect(Navigation).toBeTruthy();
    });
  });

  describe('prop type validation', () => {
    it('should log 0 errors when missing required props.', () => {
      console.error = jest.fn();

      shallow(<Navigation />);

      expect(console.error).toHaveBeenCalledTimes(0);

      console.error.mockClear();
    });
  });

  test('renders expected output', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper).toMatchSnapshot();
  });
});
