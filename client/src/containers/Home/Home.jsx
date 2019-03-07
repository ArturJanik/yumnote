import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import styles from './Home.css';

import HomeDescription from './HomeDescription/HomeDescription';
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
        <HomeDescription />
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