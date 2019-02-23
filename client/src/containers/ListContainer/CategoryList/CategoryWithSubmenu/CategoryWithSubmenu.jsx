import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <ul className={styles['sub-category-list']}>
        <li className={styles['sub-category-btn']}><Link to={{
          pathname: `/category/${category.slug}`,
          state: { category: category.name, id: category.id}
        }}>{category.name}</Link></li>
        { 
          subCategories.map(subcat => {
            return (
              (category.id === subcat.parent_id) ? (
                <li className={styles['sub-category-btn']} key={subcat.id}><Link to={{
                  pathname: `/category/${subcat.slug}`,
                  state: { category: subcat.name, id: subcat.id}
                }}>{subcat.name}</Link></li>
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
        <div className={styles['sub-category-reveal-btn']} onClick={this.toggleHandler}>{this.props.category.name}</div>
        { this.state.expand ? this.generateSubmenu(this.props) : null }
      </React.Fragment>
    )
  }
}

export default CategoryWithSubmenu;