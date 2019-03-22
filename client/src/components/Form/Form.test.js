import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

import Form from './Form';
import styles from './Form.css';

describe('<Form />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Form />);
  });

  it('should return null if no fields configuration sent', () => {
    expect(wrapper.props().fields).toEqual(undefined);
    expect(wrapper.state().fields).toEqual({});
    expect(wrapper.find('form')).toHaveLength(0);
  });
});