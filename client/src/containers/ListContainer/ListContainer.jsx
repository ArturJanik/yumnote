import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ListContainer.css';
import * as actions from '../../store/actions/index';

import CategoryList from './CategoryList/CategoryList';
import ProductList from './ProductList/ProductList';
import FoodnoteList from './FoodnoteList/FoodnoteList';

class ListContainer extends Component {

  // renderError() {
  //   if(this.props.products.length === 0){
  //     let button = <Button btnType="refresh" clicked={this.fetchData}>Refresh</Button>
  //     if(this.props.productsLoading) {
  //       button = <Button btnType="refresh loading">Refreshing...</Button>;
  //     }
  //     return (
  //       <div className={styles['error-container']}>
  //         <p className={styles['error-container__message']}>{this.props.productsError}</p>
  //         {button}
  //       </div>
  //     )
  //   }
  // }

  renderList() {
    let list = null;
    switch (this.props.subType) {
      case 'currentuser':
        list = <ProductList 
          title="My foods"
        />
        break;
      case 'latest':
        list = <ProductList 
          title="Lately yummed"
        />
        break;
      default:
        list = <FoodnoteList 
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
    let listContainer = this.renderList();

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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(actions.fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);