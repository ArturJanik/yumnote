import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './ProductListItem.css';
// import * as actions from '../../../../store/actions/index';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import Button from '../../../../components/UI/Button/Button';

class ProductListItem extends Component {

  renderProductListItem(product) {
    return (
      <div className={styles.product}>
        <p className={styles.name}>{product.name}</p>
        <div className={styles['macros-container']}>
          <div className={styles.macro}>
            <p className={styles['macro-header']}>Kcal:</p>
            <p className={styles['macro-value']}>{product.kcal}</p>
          </div>
          <div className={styles.macro}>
            <p className={styles['macros-header']}>Carb:</p>
            <p className={styles['macros-value']}>{product.carb}</p>
          </div>
          <div className={styles.macro}>
            <p className={styles['macros-header']}>Fat:</p>
            <p className={styles['macros-value']}>{product.fat}</p>
          </div>
          <div className={styles.macro}>
            <p className={styles['macros-header']}>Prot:</p>
            <p className={styles['macros-value']}>{product.prot}</p>
          </div>
        </div>
        <div className={styles.form}>
          
          <Button>+</Button>
        </div>
      </div>
    )
  }
  
  render() {
    const productListItem = this.props.product.deleteInProgress ? <Spinner /> : this.renderProductListItem(this.props.product);
    return productListItem;
  }
}

// const mapStateToProps = state => {
//   return {
    
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
    
//   }
// }

export default connect(null, null)(ProductListItem);