import React, { Component } from 'react';
import styles from './ProductList.css';

import Button from '../../../components/UI/Button/Button';
import ProductListItem from './ProductListItem/ProductListItem';

class ProductList extends Component {
  renderError() {
    if(this.props.products.length === 0){
      let button = <Button btnType="refresh" clicked={this.props.onRefreshClicked}>Refresh</Button>
      if(this.props.loading) {
        button = <Button btnType="refresh loading">Refreshing...</Button>;
      }
      return (
        <div className={styles['error-container']}>
          <p className={styles['error-container__message']}>{this.props.error}</p>
          {button}
        </div>
      )
    }
  }

  renderProducts() {
    return this.props.products.map((product, index) => <ProductListItem key={product.id} product={product} />)
  }

  render(){
    if(this.props.error !== null && this.props.products.length === 0) return this.renderError();

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