import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './FooterMenu.css';

class FooterMenu extends Component {
  render() {
    return (
      <ul className={styles['menu--footer']}>
        <li className={styles['menu-item']}><NavLink exact to="/">Menu Item #1</NavLink></li>
        <li className={styles['menu-item']}><NavLink exact to="/">Menu Item #2</NavLink></li>
        <li className={styles['menu-item']}><NavLink exact to="/">Menu Item #3</NavLink></li>
        <li className={styles['menu-item']}><NavLink exact to="/">Menu Item #4</NavLink></li>
      </ul>
    );
  }
}

export default FooterMenu;