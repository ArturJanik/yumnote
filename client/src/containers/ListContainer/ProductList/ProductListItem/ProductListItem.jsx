import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ProductListItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import * as actions from '../../../../store/actions/index';

import Spinner from '../../../../components/UI/Spinner/Spinner';

class ProductListItem extends Component {
  state = {
    amount: '1.0'
  }

  submitFoodnote = () => {
    console.log('Foodnote submitted.', 'Product id: ' + this.props.product.id, 'Date created: ' + new Date())
  }

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
          <div className={styles['amount-input']}>
            <input type="text" onChange={event => this.setState({amount: event.target.value})} placeholder="Amount" value={this.state.amount} />
            <p className={styles['amount-unit']}>{product.unit}</p>
          </div>
          <div className={styles['amount-add']} onClick={this.submitFoodnote}><FontAwesomeIcon icon={['far', 'plus-square']} /></div>
        </div>
      </div>
    )
  }
  
  render() {
    const productListItem = this.props.product.deleteInProgress ? <Spinner /> : this.renderProductListItem(this.props.product);
    return productListItem;
  }
}

const mapStateToProps = state => {
  return {
    error: state.foodnote.error, // jesli nie uda sie utworzyc foodnote
    loading: state.foodnote.loading // na czas tworzenia zeby nie mozna bylo kliknac drugi raz
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
    
//   }
// }

export default connect(mapStateToProps, null)(ProductListItem);