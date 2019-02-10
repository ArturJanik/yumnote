import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import styles from './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AuthForm from './AuthForm/AuthForm';
import * as actions from '../../store/actions/index';

class Home extends Component {

  render() {
    let authRedirect = null;
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return(
      <section className={styles.home}>
        {authRedirect}
        <div className={styles['home-teaser']}>
          <h1>Take control over your diet</h1>
          <h2>Don't let your diet control your life. Keep track of your diet with <span>yumnote</span> - simple diet tracking web application!</h2>
          <ul>
            <li><FontAwesomeIcon icon={['far', 'check-square']} />xxx foods available...</li>
            <li><FontAwesomeIcon icon={['far', 'check-square']} />...and why not add some of your favorites?</li>
            <li><FontAwesomeIcon icon={['far', 'check-square']} />fully responsive</li>
            <li><FontAwesomeIcon icon={['far', 'check-square']} />focus on most important macros</li>
          </ul>
        </div>
        <div className={styles['home-form']}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));