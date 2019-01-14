import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import styles from './Auth.css';

import AuthForm from './AuthForm/AuthForm';
import * as actions from '../../store/actions/index';

class Auth extends Component {

  componentDidMount(){
    if(this.props.authRedirectPath !== '/'){
      // this.props.onSetAuthRedirectPath();
    }
  }

  render() {
    
    let authRedirect = null;
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return(
      <section className={styles.authentication}>
        {authRedirect}
        <div className={styles.wrapper}>
          <AuthForm signUp={this.props.signUp} />
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));