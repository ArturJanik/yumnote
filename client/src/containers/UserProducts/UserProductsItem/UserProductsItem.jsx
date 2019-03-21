import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import styles from './UserProductsItem.css';
import * as actions from '../../../store/actions/index';
import ItemActions from './ItemActions/ItemActions';

class UserProductsItem extends PureComponent {

  deleteProduct = () => {
    const {id, name} = this.props.product;
    if(window.confirm(`Are you sure you want to delete product "${name}"?`)) {
      this.props.onDeleteProduct(id);
    }
  }

  toggleVisibility = () => {
    this.props.toggleVisibility(this.props.product.id)
  }

  generateStatus = (visible, id) => {
    return (
      visible ? <span className={styles.visible} onClick={this.toggleVisibility}>visible</span>
      : <span className={styles.hidden} onClick={this.toggleVisibility}>hidden</span>
    )
  }

  render(){
    const {product} = this.props;
    return (
      <li className={styles['list__item']} key={product.id}>
        <div className={styles.c1}>{product.id}</div>
        <div className={styles.c2}>{product.name}</div>
        <div className={styles.c3}>{this.generateStatus(product.visible, product.id)}</div>
        <div className={styles.c4}> <ItemActions productId={product.id} onDelete={this.deleteProduct} /></div>
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