import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import styles from './ProductList.css';
import * as actions from '../../../store/actions/index';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ProductListItem from './ProductListItem/ProductListItem';
import DatePicker from '../DatePicker/DatePicker';

class ProductList extends Component {
  state = {
    otherDaySelected: false,
    day: moment.tz(this.props.timezone).format("YYYYMMDD"),
    searchQuery: ''
  }

  today = moment.tz(this.props.timezone).format("YYYYMMDD");
  yesterday = moment.tz(this.props.timezone).subtract(1, 'day').format("YYYYMMDD");

  componentDidMount() {
    console.log(this.props.timezone)
    console.log(this.today)
    console.log(this.yesterday)
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if(this.props.type !== prevProps.type || this.props.categoryId !== prevProps.categoryId){
      this.fetchProducts();
      this.setState({searchQuery: ''})
    }
  }

  async componentWillUnmount() {
    await this.props.onListLeft();
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

  refreshList = () => {
    this.fetchProducts(); 
    this.props.fetchCategories();
  }
  
  renderError() {
    let button = <Button btnType="refresh" clicked={this.refreshList}>Refresh</Button>;
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
      <div className={styles['error']}>
        <p className={styles['error__message']}>{errorMessage}</p>
        {button}
      </div>
    )
  }

  renderEmpty() {
    return (
      <div className={styles['empty__message']}>
        No products here (yet).
      </div>
    );
  }

  renderProducts() {
    return this.props.products.map((product, index) => {
      if(this.state.searchQuery === '' || (product.name.toLowerCase()).indexOf(this.state.searchQuery) !== -1){
        return <ProductListItem key={product.id} product={product} day={this.state.day} addFoodnote={this.props.addFoodnote} />
      } else { return null }
    })
  }

  setDay = (day) => {
    this.setState({ 
      otherDaySelected: (day !== this.today && day !== this.yesterday),
      day
    });
  }

  setToday = () => this.setDay(this.today);
  setYesterday = () => this.setDay(this.yesterday);

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
      <article className={styles['product__list']}>
        <div className={styles['product__list__title']}>
          <div className={styles['btn--menu__category']} onClick={this.props.categoryMenuClicked}>Categories</div>
          <h1>{this.props.title}</h1>
          <input type="text" 
            placeholder="Filter list..." 
            className={styles['search-field']} 
            onChange={(event) => this.setState({searchQuery: event.target.value})} 
            value={this.state.searchQuery}
          />
          <div className={styles['product__list__datebtns']}>
            <div className={this.state.day === this.today ? styles['btn__day--active'] : styles['btn__day']} onClick={this.setToday}>Today</div>
            <div className={this.state.day === this.yesterday ? styles['btn__day--active'] : styles['btn__day']} onClick={this.setYesterday}>Yesterday</div>
            <DatePicker className={this.state.otherDaySelected ? styles['btn__day--active'] : styles['btn__day']} onDateSelected={this.setDay} timezone={this.props.timezone}>Other</DatePicker>
          </div>
        </div>
        <div className={styles['product__list__body']}>
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
    timezone: state.auth.currentUserTimezone
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategoryProducts: (categoryId) => dispatch(actions.fetchCategoryProducts(categoryId)),
    fetchCurrentUserProducts: () => dispatch(actions.fetchCurrentUserProducts()),
    fetchLatestProducts: () => dispatch(actions.fetchLatestProducts()),
    fetchCategories: () => dispatch(actions.fetchCategories(false)),
    addFoodnote: (data) => dispatch(actions.addFoodnote(data)),
    onListLeft: () => dispatch(actions.resetProductReducerState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);