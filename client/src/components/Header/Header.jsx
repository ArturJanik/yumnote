import React, { Component } from 'react';
import styles from './Header.css';

import Logo from './Logo/Logo';
import Menu from './Menu/Menu';

class Header extends Component {
  render() {
    return (
      <header>
        <div className={styles.wrapper}>
          <Logo />
          <Menu />
        </div>
      </header>
    );
  }
}

export default Header;