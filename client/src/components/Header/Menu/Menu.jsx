import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Menu.css';

class Menu extends Component {

  showLoggedInMenu = () => {
    return (
      <React.Fragment>
        <li className={styles['menu__item']}><NavLink exact to="/products">Products</NavLink></li>
        <li className={styles['menu__item']}><NavLink exact to="/profile">My Profile</NavLink></li>
        <li className={styles['menu__item']}> <NavLink exact to="/logout">Logout</NavLink></li>
      </React.Fragment>
    )
  }

  showNotLoggedInMenu = () => {
    return (
      <React.Fragment>
        <li className={styles['menu__item']}><NavLink exact to="/register">Signup</NavLink></li>
        <li className={styles['menu__item']}><NavLink exact to="/login">Login</NavLink></li>
      </React.Fragment>
    )
  }

  render(){
    const loggedIn = this.props.isAuth && this.props.currentUser !== null;
    return (
      <nav className={styles['menu']}>
        <ul className={styles['menu__items']}>
          { loggedIn ? this.showLoggedInMenu() : this.showNotLoggedInMenu() }
        </ul>
      </nav>
    )
  }
}

export default Menu;