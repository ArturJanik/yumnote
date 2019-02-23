import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styles from './CategoryList.css';

class CategoryList extends Component {
  
  generateSubmenuFor = (category, subCategories) => {
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

  renderSidemenu = ({categories}) => {
    categories = _.partition(categories, (cat) => cat.parent_id === null);

    const mainCategories = categories[0];
    const subCategories = categories[1];
    
    return mainCategories.map((category) => (
      <li key={category.id} className={styles['category-list-item']}>
        { category.hasSubmenu ? (
          <React.Fragment>
            <div className={styles['sub-category-reveal-btn']}>{category.name}</div>
            {this.generateSubmenuFor(category, subCategories)}
          </React.Fragment>
        ) : (
          <Link to={{
            pathname: `/category/${category.slug}`,
            state: { category: category.name, id: category.id }
          }}>{category.name}</Link>
        )}
      </li>
    ))
  }
  
  render() {
    let sidemenu = null;
    if(!this.props.loading && this.props.categories.length > 0) sidemenu = this.renderSidemenu(this.props);
    
    return (
      <aside className={styles['category-list']}>
        <ul>
          <li className={styles['category-list-item--special']}><Link to={`/foodnotes/today`}>Today</Link></li>
          <li className={styles['category-list-item--special']}><Link to={`/myfoods`}>My Foods</Link></li>
          <li className={styles['category-list-item--special']}><Link to={`/latest`}>Lately Yummed</Link></li>
          {sidemenu}
        </ul>
      </aside>
    )
  }
}

export default CategoryList;