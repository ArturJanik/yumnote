import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.css';

class MobileMenu extends Component {
  state = {
    expand: false
  }

  menuToggleHandler = () => {
    this.setState((prevState) => {
      return { expand: !prevState.expand }
    })
  }

  menuHideHandler = () => {
    this.setState({ expand: false })
  }

  render(){
    return (
      <div className={styles['menu--main']}>
        <p onClick={this.menuToggleHandler}>MainMenu</p>
        { this.state.expand ?
        (<ul className={styles['menu-items']} onClick={this.menuHideHandler}>
          <li className={styles['menu-item']}><NavLink exact to="/">Menu Item #1</NavLink></li>
          <li className={styles['menu-item']}><NavLink exact to="/">Menu Item #2</NavLink></li>
          <li className={styles['menu-item']}><NavLink exact to="/">Menu Item #3</NavLink></li>
          <li className={styles['menu-item']}><NavLink exact to="/">Menu Item #4</NavLink></li>
        </ul>) : null
        }
      </div>
    )
  }
}

export default MobileMenu;