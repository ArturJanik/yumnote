import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryList.css';

class CategoryList extends Component {
  renderFixedLinks() {
    return(
      <React.Fragment>
        <li className={styles['category-list-item--special']}><Link to={`/foodnotes/today`}>Today</Link></li>
        <li className={styles['category-list-item--special']}><Link to={`/myfoods`}>My Foods</Link></li>
        <li className={styles['category-list-item--special']}><Link to={`/latest`}>Lately Yummed</Link></li>
      </React.Fragment>
    )
  }

  renderDynamicLinks() {
    if(this.props.categories.length > 0){
      return this.props.categories.map((category, index) => (
        <li key={index} className={styles['category-list-item']}><a className="subMenuRevealBtn">{category.name}</a></li>
      ))
    }
  }

  renderSidemenu = () => {
    return (
      <ul>
        {this.renderFixedLinks()}
        {this.renderDynamicLinks()}
        {/* <li className={styles['category-list-item']}>
          <a href="#" className="subMenuRevealBtn">Dairy, Cheese &amp; Eggs</a>
          <ul className="subcategoriesContainer">
            <li className="subcategoryBtn">
              <a href="/categories/1">Dairy, Cheese &amp; Eggs</a>
            </li>
            <li className="subcategoryBtn"><a href="/categories/11">Eggs</a></li>
            <li className="subcategoryBtn"><a href="/categories/12">Yoghurt</a></li>
            <li className="subcategoryBtn"><a href="/categories/13">Cheese</a></li>
            <li className="subcategoryBtn"><a href="/categories/14">Milk &amp; Milk desserts</a></li>
          </ul>
        </li>
        <li className={styles['category-list-item']}>
          <a href="#" className="subMenuRevealBtn">Fruits &amp; Vegetables</a>
          <ul className="subcategoriesContainer">
            <li className="subcategoryBtn"><a href="/categories/2">Fruits &amp; Vegetables</a></li>
            <li className="subcategoryBtn"><a href="/categories/9">Fruits</a></li>
            <li className="subcategoryBtn"><a href="/categories/10">Vegetables</a></li>
          </ul>
        </li>
        <li className={styles['category-list-item']}>
          <a href="/categories/5">Meat, Poultry &amp; Fish</a>
        </li> */}
      </ul>
    )
  }
  
  render() {
    const sidemenu = this.renderSidemenu();
    return (
      <aside className={styles['category-list']}>
        {sidemenu}
      </aside>
    )
  }
}

export default CategoryList;