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
  
  renderError() {
    let button = <Button btnType="refresh" clicked={this.fetchProducts}>Refresh</Button>;
    let errorMessage = '';

    if(this.props.loading) {
      button = <Button btnType="refresh loading">Refreshing...</Button>;
    }

    if(this.props.error instanceof Object){
      errorMessage = this.props.error.product[0];
    } else {
      errorMessage = this.props.error;
    }

    return (
      <div className={styles['error-container']}>
        <p className={styles['error-container__message']}>{errorMessage}</p>
        {button}
      </div>
    )
  }

  renderEmpty() {
    return (
      <div className={styles['list-empty']}>
        No products here (yet).
      </div>
    );
  }

  renderProducts() {
    return this.props.products.map((product, index) => <ProductListItem key={product.id} product={product} />)
  }

  render(){
    let list = <Spinner />;
    if(this.props.error !== null) {
      list = this.renderError();
    } else if(!this.props.loading && this.props.products.length === 0) {
      list = this.renderEmpty();
    } else if(!this.props.loading && this.props.error === null) {
      list = this.renderProducts();
    }

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