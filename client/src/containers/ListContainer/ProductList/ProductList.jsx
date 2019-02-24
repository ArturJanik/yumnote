import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';

import styles from './ProductList.css';
import * as actions from '../../../store/actions/index';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ProductListItem from './ProductListItem/ProductListItem';
import DatePicker from '../DatePicker/DatePicker';

class ProductList extends Component {
  state = {
    otherDaySelected: false,
    day: moment().format("YYYYMMDD")
  }

  today = moment().format("YYYYMMDD");
  yesterday = moment().subtract(1, 'day').format("YYYYMMDD");

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if(this.props.type !== prevProps.type || this.props.categoryId !== prevProps.categoryId){
      this.fetchProducts();
    }
  }

  fetchProducts = () => {
    switch (this.props.type) {
      case 'user_foods':
        this.props.fetchCurrentUserProducts();
        break;
      case 'category_foods':
        this.props.fetchCategoryProducts(this.props.categoryId);
        break;
      case 'latest_foods':
      default:
        this.props.fetchLatestProducts();
        break;
    }
  }
  
  renderError() {
    let button = <Button btnType="refresh" clicked={() => { this.fetchProducts(); this.props.fetchCategories()}}>Refresh</Button>;
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
    return this.props.products.map((product, index) => <ProductListItem key={product.id} product={product} day={this.state.day} />)
  }

  setDay = (day) => {
    this.setState({ 
      otherDaySelected: (day !== this.today && day !== this.yesterday),
      day
    });
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
          <div className={styles['product-day']}>
            <div className={this.state.day === this.today ? styles['day-btn--active'] : styles['day-btn']} onClick={() => this.setDay(this.today)}>Today</div>
            <div className={this.state.day === this.yesterday ? styles['day-btn--active'] : styles['day-btn']} onClick={() => this.setDay(this.yesterday)}>Yesterday</div>
            <DatePicker className={this.state.otherDaySelected ? styles['day-btn--active'] : styles['day-btn']} onDateSelected={this.setDay}>Other</DatePicker>
          </div>
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
    fetchCategoryProducts: (categoryId) => dispatch(actions.fetchCategoryProducts(categoryId)),
    fetchCurrentUserProducts: () => dispatch(actions.fetchCurrentUserProducts()),
    fetchLatestProducts: () => dispatch(actions.fetchLatestProducts()),
    fetchCategories: () => dispatch(actions.fetchCategories(false)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);