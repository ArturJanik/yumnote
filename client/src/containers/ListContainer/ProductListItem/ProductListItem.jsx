import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './ProductListItem.css';
import * as actions from '../../../store/actions/index';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';

class ProductListItem extends Component {
  deleteProduct = () => {
    if(window.confirm('Are you sure you want to delete "'+this.props.product.title+'" product?')) {
      this.props.onDeleteProduct(this.props.product.id);
    }
  }

  renderProductListItem = () => {
    return (
      <div key={this.props.product.id} className={styles['product']}>
        <h1 className={styles['product-title']}>{this.props.product.title}</h1>
        <p className={styles['product-description']}>{this.props.product.description}</p>
        <Link to={`/products/${this.props.product.id}`} className={styles['product-link']}><Button>Read more...</Button></Link>
        { (this.props.isAuthenticated) ?
          (
            <React.Fragment>
              <Link to={`/products/${this.props.product.id}/edit`} className={styles['product-link']}><Button>Edit...</Button></Link>
              <Button btnType="delete" clicked={this.deleteProduct}>Delete</Button>
            </React.Fragment>
          ) : null
        }
      </div>
    )
  }
  
  render() {
    const productListItem = this.props.product.deleteInProgress ? <Spinner /> : this.renderProductListItem();
    return productListItem;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteProduct: id => dispatch(actions.deleteProduct(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListItem);