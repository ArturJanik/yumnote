import React from 'react';
import { Link } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

import Menu from './Menu';
import styles from './Menu.css';

describe('<Menu />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Menu />);
  });

  it('should render two .menu__item elements if not authenticated', () => {
    expect(wrapper.find('.menu__item')).toHaveLength(2);
  });

  it('should render three .menu__item elements if authenticated', () => {
    wrapper.setProps({loggedIn: true});
    expect(wrapper.find('.menu__item')).toHaveLength(3);
  });

  it('should render three .menu__item elements if authenticated', () => {
    wrapper.setProps({loggedIn: true});
    expect(wrapper.contains(<Link to="/logout" title="Logout">Logout</Link>)).toEqual(true);
  });
});