import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './ListContainer.css';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import CategoryList from './CategoryList/CategoryList';
import ProductListItem from './ProductListItem/ProductListItem';

class ListContainer extends Component {

  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchCategories();
  }

  renderError() {
    if(this.props.products.length === 0){
      let button = <Button btnType="refresh" clicked={this.props.onPageLoaded}>Refresh</Button>
      if(this.props.loading) {
        button = <Button btnType="refresh loading">Refreshing...</Button>;
      }
      return (
        <div className={styles['error-container']}>
          <p className={styles['error-container__message']}>{this.props.productsError}</p>
          {button}
        </div>
      )
    }
  }

  renderProducts() {
    if(this.props.error !== null && this.props.products.length === 0) return this.renderError();
    
    return this.props.products.map((product, index) => <ProductListItem key={index} product={product} />)
  }

  renderProductList = () => {
    return (
      <React.Fragment>
        <CategoryList categories={this.props.categories} />
        <article className={styles['product-list']}>{this.renderProducts()}</article>
      </React.Fragment>
    )
  }
  
  render() {
    let productList = <Spinner />;
    if(!this.props.productsLoading) productList = this.renderProductList();
    return (
      <section className={styles['product-section']}>
        <div className={styles.wrapper}>
          {productList}
          {(!this.props.productsLoading && false === true)
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
    categories: state.category.categories,
    categoriesLoading: state.category.loading,
    categoriesError: state.category.error,
    products: state.product.products,
    productsLoading: state.product.loading,
    productsError: state.product.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(actions.fetchProducts()),
    fetchCategories: () => dispatch(actions.fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);