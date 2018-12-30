import React, { Component } from 'react';
import styles from './Header.css';

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