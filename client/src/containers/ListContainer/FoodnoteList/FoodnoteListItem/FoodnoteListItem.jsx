import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './FoodnoteListItem.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import * as actions from '../../../../store/actions/index';

// import Spinner from '../../../../components/UI/Spinner/Spinner';

class FoodnoteListItem extends Component {

  renderFoodnoteListItem(foodnote) {
    return (
      <div className={styles.foodnote}>
        <div className={styles['foodnote-product-name']}>{foodnote.product.name}</div>
        <div className={styles['foodnote-product-data']}>
          <div className={styles.wide}><input type="text" /></div>
          <div>0.0</div>
          <div>0.0</div>
          <div>0.0</div>
          <div>0.0</div>
        </div>
        <div className={styles['foodnote-product-actions']}>Action</div>
      </div>
    )
  }
  
  render() {
    return this.renderFoodnoteListItem(this.props.foodnote);
  }
}

// const mapStateToProps = state => {
//   return {
//     error: state.foodnote.error, // jesli nie uda sie utworzyc foodnote
//     loading: state.foodnote.loading // na czas tworzenia zeby nie mozna bylo kliknac drugi raz
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
    
//   }
// }

export default connect(null, null)(FoodnoteListItem);