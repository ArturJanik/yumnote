import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Menu.css';

class Menu extends Component {

  showLoggedInMenu = () => {
    return (
      <React.Fragment>
        <li className={styles['menu-item']}><NavLink exact to="/">My Products</NavLink></li>
        <li className={styles['menu-item']}><NavLink exact to="/">My Profile</NavLink></li>
        <li className={styles['menu-item']}> <NavLink exact to="/logout" className={styles["link--auth"]}>Logout</NavLink></li>
      </React.Fragment>
    )
  }

  showNotLoggedInMenu = () => {
    return (
      <React.Fragment>
        <li className={styles['menu-item']}><NavLink exact to="/register" className={styles["link--auth"]}>Signup</NavLink></li>
        <li className={styles['menu-item']}><NavLink exact to="/login" className={styles["link--auth"]}>Login</NavLink></li>
      </React.Fragment>
    )
  }

  render(){
    const loggedIn = this.props.isAuth && this.props.currentUser !== null;
    return (
      <nav className={styles['menu--main']}>
        <ul className={styles['menu-items']}>
          { loggedIn ? this.showLoggedInMenu() : this.showNotLoggedInMenu() }
        </ul>
      </nav>
    )
  }
}

export default Menu;