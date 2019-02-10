import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class ProtectedRoute extends Component {
  componentDidMount () {
    if(!this.props.auth && this.props.location.pathname.toLowerCase() !== '/logout') this.props.onSetAuthRedirectPath(this.props.location.pathname);
  }

  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props}
        render={props => (
          this.props.auth ?
            <Component {...props} /> :
            <Redirect to='/login' />
        )} 
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(null, mapDispatchToProps)(ProtectedRoute);