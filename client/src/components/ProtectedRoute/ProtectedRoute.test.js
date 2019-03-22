import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

import { ProtectedRoute } from './ProtectedRoute';

const simpleComponent = () => <div>Simple component</div>;

describe('<Home />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProtectedRoute path="/test-path" location={{pathname: '/test-path'}} exact onSetAuthRedirectPath={()=> {}} />);
    wrapper.setProps({component: simpleComponent});
  });

  it('should render <Redirect /> if user is not authenticated', () => {
    wrapper.setProps({isAuthenticated: false});
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it('should return <Route /> to passed component if user is authenticated', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(Route)).toHaveLength(1);
    expect(wrapper.find(Route).props().render().props.component).toEqual(simpleComponent);
  });
});