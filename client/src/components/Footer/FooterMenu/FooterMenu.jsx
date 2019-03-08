import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './FooterMenu.css';

class FooterMenu extends Component {
  render() {
    return (
      <ul className={styles['menu--footer']}>
        <li className={styles['menu-item']}><Link exact to="/doc/how-it-works" title="How it works">Functions</Link></li>
        <li className={styles['menu-item']}><Link exact to="/doc/privacy-policy" title="Privacy policy">Privacy Policy</Link></li>
      </ul>
    );
  }
}

export default FooterMenu;