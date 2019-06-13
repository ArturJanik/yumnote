import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

import { Button } from './Button';
import styles from './Button.css';

describe('<Button />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Button />);
  });

  it('should render regular Button if no btnType passed', () => {
    expect(wrapper.find('.btn--regular')).toHaveLength(1);
  });

  it('should add selected class if button selected', () => {
    wrapper.setProps({selected: true})
    expect(wrapper.find('.btn--regular--selected')).toHaveLength(1);
  });

  it('should return disabled button if props "disabled" passed', () => {
    wrapper.setProps({disabled: true})
    expect(wrapper.find('button').prop('disabled')).toEqual(true);
  });

  it('should render Button with passed btnType', () => {
    wrapper.setProps({btnType: 'sometype'})
    expect(wrapper.find('.btn--regular')).toHaveLength(0);
    expect(wrapper.find('.btn--sometype')).toHaveLength(1);
  });
});