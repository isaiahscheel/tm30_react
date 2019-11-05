import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import HomeRedux, { Home } from './home';

/*
* During test writing you can selectively run just these tests or skip individual ones while you
* work on others https://facebook.github.io/jest/docs/en/api.html#testskipname-fn
*/
describe('<Home />', () => {
  describe('checking for component import errors', () => {
    it('should be in the components directory', () => {
      expect(Home).toBeTruthy();
    });
  });

  describe('prop type validation', () => {
    it('should log 0 errors when missing required props.', () => {
      console.error = jest.fn();

      shallow(<Home />);

      expect(console.error).toHaveBeenCalledTimes(0);

      console.error.mockClear();
    });
  });

  test('renders expected output', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot('default');
  });

  test('renders expected output when me is provided', () => {
    const wrapper = shallow(<Home me={{ id: '6436247' }} />);
    expect(wrapper).toMatchSnapshot('with me prop');
  });

  describe('connected to redux', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    const getState = {
      me: {},
    }; // initial state of the store
    const store = mockStore(getState);
    const wrapper = shallow(<HomeRedux store={store} />);

    it('renders expected output', () => {
      expect(wrapper).toMatchSnapshot('default redux');
    });

    it('pathname prop should be location', () => {
      expect(wrapper.props().me).toBeDefined();
    });
  });
});
