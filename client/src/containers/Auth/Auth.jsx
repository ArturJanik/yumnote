import React, { Component } from 'react';
import styles from './Auth.css';

import AuthForm from './AuthForm/AuthForm';

class Auth extends Component {
  render() {
    return(
      <section className={styles.authentication}>
        <div className={styles.wrapper}>
          <AuthForm signUp={this.props.signUp} />
        </div>
      </section>
    )
  }
}

export default Auth;