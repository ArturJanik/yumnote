import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './FoodnoteListItem.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from '../../../../store/actions/index';

// import Spinner from '../../../../components/UI/Spinner/Spinner';

class FoodnoteListItem extends Component {
  state = {
    amount: 0.0
  }

  componentDidMount (){
    this.setState({amount: this.props.foodnote.amount})
  }

  onAmountChange = (event) => {
    this.setState({amount: event.target.value})
  }

  onAmountInputBlue = (event) => {
    this.props.updateFoodnote(this.props.foodnote.id, event.target.value);
  }

  renderFoodnoteListItem(foodnote) {
    return (
      <div className={styles.foodnote}>
        <div className={styles['foodnote-product-name']}>{foodnote.product.name}</div>
        <div className={styles['foodnote-product-data']}>
          <div className={styles.wide}>
            <input type="text" value={this.state.amount} onChange={this.onAmountChange} onBlur={this.onAmountInputBlue} />
            <span>{foodnote.product.unit}</span>
          </div>
          <div>{foodnote.product.kcal * this.state.amount}</div>
          <div>{foodnote.product.carb * this.state.amount}</div>
          <div>{foodnote.product.fat * this.state.amount}</div>
          <div>{foodnote.product.prot * this.state.amount}</div>
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

const mapDispatchToProps = dispatch => {
  return {
    updateFoodnote: (id, amount) => dispatch(actions.updateFoodnote(id, amount)),
  }
}

export default connect(null, mapDispatchToProps)(FoodnoteListItem);