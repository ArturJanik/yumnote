import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.css';
import logo from '../../../assets/images/logo.png';

class Logo extends PureComponent {
  render() {
    return (
      <Link to="/" className={styles.logo} title="Calories.today home page"><img src={logo} alt="Calories.today" /></Link>
    );
  }
}

export default Logo;