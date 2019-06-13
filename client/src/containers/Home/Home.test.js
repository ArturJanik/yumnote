import React from 'react';
import { Redirect } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

import { Home } from './Home';
import AuthForm from './AuthForm/AuthForm';
import styles from './Home.css';

describe('<Home />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it('should render <AuthForm /> if not authenticated', () => {
    expect(wrapper.find(AuthForm)).toHaveLength(1);
  });

  it('should not render <Redirect /> if not authenticated', () => {
    expect(wrapper.find(Redirect)).toHaveLength(0);
  });

  it('should render <Redirect /> if authenticated', () => {
    wrapper.setProps({isAuthenticated: true, authRedirectPath: '/'});
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
  
  it('should not render <AuthForm /> if authenticated', () => {
    wrapper.setProps({isAuthenticated: true, authRedirectPath: '/'});
    expect(wrapper.find(AuthForm)).toHaveLength(0);
  });
});