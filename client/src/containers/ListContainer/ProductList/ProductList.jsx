import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ProductList.css';
import * as actions from '../../../store/actions/index';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ProductListItem from './ProductListItem/ProductListItem';

class ProductList extends Component {

  componentDidMount() {
    this.props.fetchProducts();
  }

  renderProducts() {
    return this.props.products.map((product, index) => <ProductListItem key={product.id} product={product} />)
  }

  render(){
    let list = <Spinner />;
    if(!this.props.loading && this.props.error === null) list = this.renderProducts();
    if(this.props.error !== null) list = 'ProductList.jsx error';
    return(
      <article className={styles['product-list']}>
        <div className={styles['list-header']}>
          <h1>{this.props.title}</h1>
        </div>
        <div className={styles['list-body']}>
          {list}
        </div>
      </article>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
    loading: state.product.loading,
    error: state.product.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(actions.fetchProducts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);