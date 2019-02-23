import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './UserProducts.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class UserProducts extends Component {
  
  componentDidMount() {
    this.props.fetchCurrentUserProducts();
  }

  generateStatus = (visible, id) => {
    return (
      visible ? <span className={styles.visible} onClick={() => this.props.toggleProductVisibility(id)}>visible</span>
      : <span className={styles.hidden} onClick={() => this.props.toggleProductVisibility(id)}>hidden</span>
    )
  }

  render(){
    return (
      <section className={styles['list-container']}>
        <div className={styles.wrapper}>
          <h1>Your products</h1>
          <ul className={styles['product-list']}>
            <li className={styles['list-header']}>
              <p className={styles.c20}>Id</p>
              <p className={styles.c30}>Name</p>
              <p className={styles.c20}>Visible</p>
              <p className={styles.c30}>Actions</p>
            </li>
            { this.props.loading ? <Spinner /> : (
              this.props.products.map(product => {
                return (
                  <li className={styles['list-item']} key={product.id}>
                    <p className={styles.c20}>{product.id}</p>
                    <p className={styles.c30}>{product.name}</p>
                    <p className={styles.c20}>{this.generateStatus(product.visible, product.id)}</p>
                    <p className={styles.c30}>Actions</p>
                  </li>
                )
              })
            )}
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
    toggleProductVisibility: (id) => dispatch(actions.toggleProductVisibility(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProducts);