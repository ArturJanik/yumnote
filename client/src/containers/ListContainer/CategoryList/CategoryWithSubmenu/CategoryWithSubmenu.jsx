import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CategoryWithSubmenu.css';

class CategoryWithSubmenu extends Component {
  state = {
    expand: false
  }

  toggleHandler = () => {
    this.setState((prevState) => {
      return { expand: !prevState.expand }
    })
  }

  hideHandler = () => {
    this.setState({ expand: false })
  }

  generateSubmenu = ({category, subCategories}) => {
    return (
      <ul className={styles['subcategory__list']}>
        <li className={styles['subcategory__btn']} onClick={this.props.onClick}>
          <NavLink to={{
            pathname: `/category/${category.slug}`,
            state: { category: category.name, id: category.id}
          }}
          activeClassName={styles.active}>{category.name}</NavLink>
        </li>
        { 
          subCategories.map(subcat => {
            return (
              (category.id === subcat.parent_id) ? (
                <li className={styles['subcategory__btn']} key={subcat.id} onClick={this.props.onClick}>
                  <NavLink to={{
                    pathname: `/category/${subcat.slug}`,
                    state: { category: subcat.name, id: subcat.id}
                  }}
                  activeClassName={styles.active}>{subcat.name}</NavLink>
                </li>
              ) : null
            )
          })
        }
      </ul>
    )
  }

  render(){
    return(
      <React.Fragment>
        <div className={styles['subcategory__btn--reveal']} onClick={this.toggleHandler}>{this.props.category.name}</div>
        { this.state.expand ? this.generateSubmenu(this.props) : null }
      </React.Fragment>
    )
  }
}

export default CategoryWithSubmenu;