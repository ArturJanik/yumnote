import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './FoodnoteListItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import * as actions from '../../../../store/actions/index';

import Spinner from '../../../../components/UI/Spinner/Spinner';

class FoodnoteListItem extends Component {

  renderFoodnoteListItem(foodnote) {
    return (
      <div className={styles.foodnote}>
        Foodnote
      </div>
    )
  }
  
  render() {
    return this.renderFoodnoteListItem();
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