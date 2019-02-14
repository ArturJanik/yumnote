import React, { Component } from 'react';
import styles from './ProductList.css';

import ProductListItem from './ProductListItem/ProductListItem';

class ProductList extends Component {
  renderProducts() {
    return this.props.products.map((product, index) => <ProductListItem key={product.id} product={product} />)
  }

  render(){
    return(
      <article className={styles['product-list']}>
        <div className={styles['list-header']}>
          <h1>{this.props.title}</h1>
        </div>
        <div className={styles['list-body']}>
          {this.renderProducts()}
        </div>
      </article>
    )
  }
}

export default ProductList;