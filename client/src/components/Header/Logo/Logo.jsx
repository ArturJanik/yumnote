import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.css';
import logo from '../../../assets/images/logo.png';

class Logo extends Component {
  render() {
    return (
      <Link to="/" className={styles.logo}><img src={logo} alt="Test logo" /></Link>
    );
  }
}

export default Logo;