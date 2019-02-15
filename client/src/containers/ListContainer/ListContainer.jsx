import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ListContainer.css';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import CategoryList from './CategoryList/CategoryList';
import ProductList from './ProductList/ProductList';
import FoodnoteList from './FoodnoteList/FoodnoteList';

class ListContainer extends Component {

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    if(this.props.listType === 'products') {
      this.props.fetchProducts();
    } else {
      this.props.fetchFoodnotes();
    }
    this.props.fetchCategories();
  }

  renderError() {
    if(this.props.products.length === 0){
      let button = <Button btnType="refresh" clicked={this.fetchData}>Refresh</Button>
      if(this.props.productsLoading) {
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

  renderList() {
    let list = null;
    switch (this.props.subType) {
      case 'currentuser':
        list = <ProductList 
          products={this.props.products} 
          title="My foods"
        />
        break;
      case 'latest':
        list = <ProductList 
          products={this.props.products} 
          title="Lately yummed"
        />
        break;
      default:
        list = <FoodnoteList
          foodnotes={this.props.foodnotes}
          title="Today"
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
    if(this.props.productsError !== null && this.props.products.length === 0){ 
      listContainer = this.renderError();
    } else if(!this.props.productsLoading && !this.props.categoriesLoading && !this.props.foodnotesLoading) {
      listContainer = this.renderList();
    }
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
    foodnotes: state.foodnote.foodnotes,
    foodnotesLoading: state.foodnote.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(actions.fetchProducts()),
    fetchFoodnotes: () => dispatch(actions.fetchFoodnotes()),
    fetchCategories: () => dispatch(actions.fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);