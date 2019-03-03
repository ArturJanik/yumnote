import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import styles from './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AuthForm from './AuthForm/AuthForm';

class Home extends Component {

  componentDidMount() {
    document.title = 'Keep track of your diet everyday - with calories.today';
  }

  render() {
    let authRedirect = null;
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return(
      <section className={styles.home}>
        {authRedirect}
        <div className={styles['home__teaser']}>
          <h1>Take control over your diet</h1>
          <p className={styles['home__subtitle']}>Don't let your diet control your life. Keep track of your diet with <span>calories.today</span> - simple calories tracking web application!</p>
          <ul>
            <li><FontAwesomeIcon icon={['far', 'check-square']} />xxx foods available...</li>
            <li><FontAwesomeIcon icon={['far', 'check-square']} />...and why not add some of your favorites?</li>
            <li><FontAwesomeIcon icon={['far', 'check-square']} />focus on most important macros</li>
            <li><FontAwesomeIcon icon={['far', 'check-square']} />fully responsive</li>
          </ul>
        </div>
        <div className={styles['home__form']}>
          <AuthForm signUp={this.props.signUp} />
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    authRedirectPath: state.auth.authRedirectPath,
  }
}

export default connect(mapStateToProps, null)(withRouter(Home));