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

  it('should have hidden mobile menu by default', () => {
    expect(wrapper.state('showMenu')).toEqual(false);
    expect(wrapper.find('.menu__overlay--hide')).toHaveLength(1);
    expect(wrapper.find('.menu--hide')).toHaveLength(1);
  });
  
  it('can toggle menu visibility', () => {
    wrapper.find(".btn--menu").first().simulate("click");
    expect(wrapper.state('showMenu')).toEqual(true);
    expect(wrapper.find('.menu__overlay')).toHaveLength(1);
    expect(wrapper.find('.menu')).toHaveLength(1);
    wrapper.find(".btn--menu").first().simulate("click");
    expect(wrapper.state('showMenu')).toEqual(false);
  });
  
  it('can hide menu with overlay clicked', () => {
    wrapper.find(".btn--menu").first().simulate("click");
    expect(wrapper.state('showMenu')).toEqual(true);
    wrapper.find(".menu__overlay").first().simulate("click");
    expect(wrapper.state('showMenu')).toEqual(false);
  });
});