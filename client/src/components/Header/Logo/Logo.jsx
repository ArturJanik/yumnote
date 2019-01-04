import React, { Component } from 'react';
import styles from './Logo.css';
import logo from './logo.png';

class Logo extends Component {
  render() {
    return (
      <div className={styles.logo}><img src={logo} alt="Test logo" /></div>
    );
  }
}

export default Logo;