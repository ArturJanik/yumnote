import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styles from './CategoryList.css';

import StaticLinks from './StaticLinks/StaticLinks';
import CategoryWithSubmenu from './CategoryWithSubmenu/CategoryWithSubmenu';

class CategoryList extends PureComponent {
  
  renderSidemenu = (categories) => {
    categories = _.partition(categories, (cat) => cat.parent_id === null);

    const mainCategories = categories[0];
    const subCategories = categories[1];
    
    return mainCategories.map((category) => (
      <li key={category.id} className={styles['category__item']}>
        { category.hasSubmenu ? <CategoryWithSubmenu category={category} subCategories={subCategories} onClick={this.props.hideMenuClicked} /> : (
          <Link to={{
            pathname: `/category/${category.slug}`,
            state: { category: category.name, id: category.id }
          }} onClick={this.props.hideMenuClicked} title={category.name}>{category.name}</Link>
        )}
      </li>
    ))
  }
  
  render() {
    let sidemenu = null;
    if(!this.props.loading && this.props.categories.length > 0) sidemenu = this.renderSidemenu(this.props.categories);
    
    return (
      <React.Fragment>
        <div className={styles['category__list__overlay' + (this.props.showMenu ? '' : '--hide')]} onClick={this.props.hideMenuClicked}></div>
        <aside className={styles['category__list' + (this.props.showMenu ? '' : '--hide')]}>
          <ul>
            <StaticLinks clicked={this.props.hideMenuClicked} />
            {sidemenu}
          </ul>
        </aside>
      </React.Fragment>
    )
  }
}

export default CategoryList;