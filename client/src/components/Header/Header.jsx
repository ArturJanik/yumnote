import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styles from './Header.css';

import Logo from './Logo/Logo';
import Menu from './Menu/Menu';

class Header extends PureComponent {
  render() {
    return (
      <header>
        <div className={styles['header__wrapper']}>
          <Logo />
          <Menu
            loggedIn={this.props.isAuthenticated}
          />
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: (state.auth.token !== null && state.auth.currentUser !== null),
  }
}

export default connect(mapStateToProps)(Header);