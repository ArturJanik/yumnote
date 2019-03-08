import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './FooterMenu.css';

class FooterMenu extends Component {
  render() {
    return (
      <ul className={styles['menu--footer']}>
        <li className={styles['menu-item']}><NavLink exact to="/doc/how-it-works" title="How it works">Functions</NavLink></li>
        <li className={styles['menu-item']}><NavLink exact to="/doc/privacy-policy" title="Privacy policy">Privacy Policy</NavLink></li>
      </ul>
    );
  }
}

export default FooterMenu;