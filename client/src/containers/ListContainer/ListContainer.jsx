import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ListContainer.css';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';
import CategoryList from './CategoryList/CategoryList';
import ProductList from './ProductList/ProductList';

class ListContainer extends Component {

  componentDidMount() {
    if(this.props.listType === 'products') {
      this.props.fetchProducts();
    } else {
      this.props.fetchProducts();
    }
    this.props.fetchCategories();
  }

  renderList() {
    let list = null;
    switch (this.props.subType) {
      case 'currentuser':

        break;
      case 'latest':
      
        break;
      default:
        list = <ProductList 
          products={this.props.products} 
          title="Today" 
          error={this.props.productsError} 
          loading={this.props.productsLoading} 
          onRefreshClicked={this.props.fetchProducts}
        />
        break;
    }

    return (
      <React.Fragment>
        <CategoryList categories={this.props.categories} />
        {list}
      </React.Fragment>
    )
  }
  
  render() {
    let listContainer = <Spinner />;
    if(!this.props.productsLoading && !this.props.categoriesLoading) listContainer = this.renderList();
    return(
      <section className={styles['list-container']}>
        <div className={styles.wrapper}>
          {listContainer}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
    categoriesLoading: state.category.loading,
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