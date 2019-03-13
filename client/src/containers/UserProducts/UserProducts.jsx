import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './UserProducts.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import UserProductsItem from './UserProductsItem/UserProductsItem';

class UserProducts extends Component {

  state = {
    searchQuery: null
  }
  
  componentDidMount() {
    document.title = 'User products administration - calories.today'
    if(this.props.products.length === 0){
      this.props.fetchCurrentUserProducts();
    }
  }

  render(){
    return (
      <section className={styles['list__container']}>
        <div className={styles['list__wrapper']}>
          <div className={styles['list__heading']}>
            <h1>Your products</h1>
            <div className={styles['list__heading__right']}>
              <input type="text" 
                placeholder="Filter results..." 
                className={styles['search-field']} 
                onChange={(event) => this.setState({searchQuery: event.target.value})} 
              />
              <Link to="/products/new" title="Create new product"><Button>Create product</Button></Link>
            </div>
          </div>
          <ul className={styles['product__list']}>
            <li className={styles['product__list__header']}>
              <p className={styles.c1}>Id</p>
              <p className={styles.c2}>Name</p>
              <p className={styles.c3}>Visible</p>
              <p className={styles.c4}>Actions</p>
            </li>
            { this.props.loading ? <Spinner /> : 
              this.props.products.map(product => {
                if(!this.state.searchQuery || (product.name.toLowerCase()).indexOf(this.state.searchQuery) !== -1){
                  return <UserProductsItem product={product} key={product.id} />;
                } else { return null }
              })
            }
          </ul>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.userProducts,
    loading: state.product.loading,
    error: state.product.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUserProducts: () => dispatch(actions.fetchCurrentUserProducts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProducts);