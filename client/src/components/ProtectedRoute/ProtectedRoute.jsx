import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

export class ProtectedRoute extends PureComponent {
  
  componentDidMount () {
    if(!this.props.isAuthenticated && this.props.location.pathname.toLowerCase() !== '/logout') this.props.onSetAuthRedirectPath(this.props.location.pathname);
  }
  
  render() {
    const { component: Component, ...props } = this.props;
    if(!this.props.isAuthenticated) return <Redirect to='/login' />;
    return (
      <Route 
        {...props}
        render={props => <Component {...this.props} {...props} />} 
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null && state.auth.currentUser !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);