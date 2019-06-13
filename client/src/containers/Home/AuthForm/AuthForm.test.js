import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

import { AuthForm } from './AuthForm';
import styles from './AuthForm.css';

describe('<AuthForm />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AuthForm resetAuthReducerState={()=>{}} />);
  });

  it('should not render .auth__link element if loading', () => {
    wrapper.setProps({loading: true});
    expect(wrapper.find('.auth__link')).toHaveLength(0);
  });

  it('should render 2 .auth__link elements if login mode on and not loading', () => {
    expect(wrapper.find('.auth__link')).toHaveLength(2);
  });

  it('should render 1 .auth__link element if signup mode on and not loading', () => {
    wrapper.setProps({signUp: true}, () => {
      expect(wrapper.find('.auth__link')).toHaveLength(1);
    });
  });
});