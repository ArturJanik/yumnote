import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import burgerIcon from './burger-icon.svg';
import styles from './Menu.css';

class Menu extends Component {

  state = {
    showMenu: false
  }

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

  hideMenu = () => {
    this.setState({showMenu: false})
  }

  toggleMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  render(){
    const loggedIn = this.props.isAuth && this.props.currentUser !== null;
    return (
      <React.Fragment>
        <div className={styles['menu__overlay' + (this.state.showMenu ? '' : '--hide')]} onClick={this.hideMenu}></div>
        <nav className={styles['menu' + (this.state.showMenu ? '' : '--hide')]}>
          <ul className={styles['menu__items']}>
            { loggedIn ? this.showLoggedInMenu() : this.showNotLoggedInMenu() }
          </ul>
        </nav>
        <div className={styles['btn--menu']} onClick={this.toggleMenu}><img src={burgerIcon} alt="Toggle menu" /></div>
      </React.Fragment>
    )
  }
}

export default Menu;