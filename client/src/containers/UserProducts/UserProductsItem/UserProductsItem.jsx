import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './UserProductsItem.css';
import * as actions from '../../../store/actions/index';

class UserProductsItem extends Component {
  generateStatus = (visible, id) => {
    return (
      visible ? <span className={styles.visible} onClick={() => this.props.toggleVisibility(id)}>visible</span>
      : <span className={styles.hidden} onClick={() => this.props.toggleVisibility(id)}>hidden</span>
    )
  }

  render(){
    const {product} = this.props;
    return (
      <li className={styles['list-item']} key={product.id}>
        <p className={styles.c20}>{product.id}</p>
        <p className={styles.c30}>{product.name}</p>
        <p className={styles.c20}>{this.generateStatus(product.visible, product.id)}</p>
        <p className={styles.c30}>Actions</p>
      </li>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleVisibility: (id) => dispatch(actions.toggleProductVisibility(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProductsItem);