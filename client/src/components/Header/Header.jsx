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
            <NavLink exact to="/logout" className={styles["link--auth"]}><Button btnType='auth-logout'>Logout</Button></NavLink>
            ) : <NavLink exact to="/login" className={styles["link--auth"]}><Button btnType='auth-login'>Login/Signup</Button></NavLink>
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