import React, { Component } from 'react';
import styles from './Header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <div className={styles.wrapper}>
          Template Rails API + React app
        </div>
      </header>
    );
  }
}

export default Header;