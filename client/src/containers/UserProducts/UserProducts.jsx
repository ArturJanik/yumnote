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
    this.props.fetchCurrentUserProducts();
  }

  generateStatus = (visible, id) => {
    return (
      visible ? <span className={styles.visible} onClick={() => this.props.toggleProductVisibility(id)}>visible</span>
      : <span className={styles.hidden} onClick={() => this.props.toggleProductVisibility(id)}>hidden</span>
    )
  }

  filterProducts = (query) => {
    this.setState({searchQuery: query})
  }

  render(){
    return (
      <section className={styles['list-container']}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <h1>Your products</h1>
            <div style={{'display': 'flex'}}>
              <input type="text" 
                placeholder="Filter results..." 
                className={styles['search-field']} 
                onChange={(event) => this.setState({searchQuery: event.target.value})} 
              />
              <Link to="/products/new"><Button btnType="product--create">Create product</Button></Link>
            </div>
          </div>
          <ul className={styles['product-list']}>
            <li className={styles['list-header']}>
              <p className={styles.c20}>Id</p>
              <p className={styles.c30}>Name</p>
              <p className={styles.c20}>Visible</p>
              <p className={styles.c30}>Actions</p>
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
    products: state.product.products,
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