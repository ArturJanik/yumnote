import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './UserProductsItem.css';
import * as actions from '../../../store/actions/index';

class UserProductsItem extends Component {

  deleteProduct = ({id, name}) => {
    if(window.confirm(`Are you sure you want to delete product "${name}"?`)) {
      this.props.onDeleteProduct(id);
    }
  }

  generateStatus = (visible, id) => {
    return (
      visible ? <span className={styles.visible} onClick={() => this.props.toggleVisibility(id)}>visible</span>
      : <span className={styles.hidden} onClick={() => this.props.toggleVisibility(id)}>hidden</span>
    )
  }

  generateActions = (id) => {
    return (
      <React.Fragment>
        <Link className={styles['link-edit']} to={`/products/${id}/edit`}>edit</Link>
        <span className={styles['link-delete']} onClick={() => this.deleteProduct(this.props.product)}>delete</span>
      </React.Fragment>
    )
  }

  render(){
    const {product} = this.props;
    return (
      <li className={styles['list-item']} key={product.id}>
        <div className={styles.c20}>{product.id}</div>
        <div className={styles.c30}>{product.name}</div>
        <div className={styles.c20}>{this.generateStatus(product.visible, product.id)}</div>
        <div className={styles.c30}>{this.generateActions(product.id)}</div>
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
    toggleVisibility: id => dispatch(actions.toggleProductVisibility(id)),
    onDeleteProduct: id => dispatch(actions.deleteProduct(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProductsItem);