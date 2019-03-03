import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Header.css';

import Logo from './Logo/Logo';
import Menu from './Menu/Menu';
// import MobileMenu from './MobileMenu/MobileMenu';

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
        <div className={styles['header__wrapper']}>
          <Logo />
          <Menu
            isAuth={this.props.isAuthenticated}
            currentUser={this.props.currentUserName}
          />
          {/* <MobileMenu 
            expand={this.state.expandMainMenu}
            clicked={this.mainMenuToggleHandler}
          /> */}
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    currentUserName: state.auth.currentUser
  }
}

export default connect(mapStateToProps)(Header);