import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './ProductList.css';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import ProductListItem from './ProductListItem/ProductListItem';

class ProductList extends Component {

  componentDidMount() {
    this.props.onPageLoaded();
  }

  renderError() {
    if(this.props.products.length === 0){
      let button = <Button btnType="refresh" clicked={this.props.onPageLoaded}>Refresh</Button>
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
    if(this.props.error !== null && this.props.products.length === 0) return this.renderError();
    
    return this.props.products.map((product, index) => <ProductListItem key={index} product={product} />)
  }
  
  render() {
    return (
      <section className={styles['product-list']}>
        <div className={styles.wrapper}>
          {(!this.props.loading)
            ? this.renderProducts()
            : <Spinner />
          }
          {(!this.props.loading && this.props.isAuthenticated)
            ? <Link to={`/products/new`} className={styles['product-btn--create']}><Button btnType="success">Create new product</Button></Link>
            : null
          }
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
    loading: state.product.loading,
    error: state.product.error,
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPageLoaded: () => dispatch(actions.fetchProducts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);