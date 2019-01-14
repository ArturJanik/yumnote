import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.css';

import Button from '../UI/Button/Button';
import Logo from './Logo/Logo';
import Menu from './Menu/Menu';

class Header extends Component {
  state = {
    expandMainMenu: false,
  }

  mainMenuToggleHandler = () => {
    this.setState((prevState) => {
      return { expandMainMenu: !prevState.expandMainMenu }
    })
  }

  render() {
    return (
      <header>
        <div className={styles.wrapper}>
          <Logo />
          { this.props.isAuth && this.props.currentUser !== null ? (
            <Button btnType='auth-logout'><NavLink exact to="/logout">Logout</NavLink></Button>
            ) : <Button btnType='auth-login'><NavLink exact to="/login">Login/Signup</NavLink></Button>
          }
          <Menu
            expand={this.state.expandMainMenu}
            clicked={this.mainMenuToggleHandler}
          />
        </div>
      </header>
    );
  }
}

export default Header;