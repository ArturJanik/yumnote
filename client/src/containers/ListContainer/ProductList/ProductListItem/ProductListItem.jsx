import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ProductListItem.css';
import * as actions from '../../../../store/actions/index';

import SingleMacro from './SingleMacro/SingleMacro';
import AmountInput from './AmountInput/AmountInput';
import AddButton from './AddButton/AddButton';

class ProductListItem extends Component {
  state = {
    amount: '1.0',
    createSuccess: false,
    createFailure: false
  }

  componentDidUpdate(prevProps) {
    const inProgress = this.props.product.foodnoteCreationInProgress;
    if(prevProps.product.foodnoteCreationInProgress !== inProgress && inProgress === false){
      if(this.props.product.error !== null){
        this.setState({ createFailure: true });
        this.timer2 = setTimeout(() => {
          this.setState({ createFailure: false });
        }, 1000);
      } else {
        this.setState({ createSuccess: true });
        this.timer = setTimeout(() => {
          this.setState({ createSuccess: false });
        }, 1000);
      }
    }
  }

  componentWillUnmount() {
    if(this.timer) clearTimeout(this.timer);
    if(this.timer2) clearTimeout(this.timer2);
  }

  submitFoodnote = () => {
    if(this.state.amount) {
      if(this.state.amount === '0') {
        this.setState({amount: '1.0'})
      } else {
        const data = {
          product_id: this.props.product.id,
          amount: this.state.amount,
          created_at: this.props.day
        }
        this.props.addFoodnote(data);
      }
    }
  }

  onAmountChange = (event) => {
    this.setState({amount: event.target.value})
  }

  generateMacros = (product) => {
    return (
      <div className={styles['macros-container']}>
        <SingleMacro name="Kcal" val={product.kcal} amount={this.state.amount} />
        <SingleMacro name="Carb" val={product.carb} amount={this.state.amount} />
        <SingleMacro name="Fat" val={product.fat} amount={this.state.amount} />
        <SingleMacro name="Prot" val={product.prot} amount={this.state.amount} />
      </div>
    )
  }

  generateForm = ({foodnoteCreationInProgress, unit}) => {
    return (
      <div className={styles.form}>
        <AmountInput inProgress={foodnoteCreationInProgress} onChange={this.onAmountChange} amount={this.state.amount} unit={unit} />
        <AddButton inProgress={foodnoteCreationInProgress} clicked={this.submitFoodnote} createSuccess={this.state.createSuccess} createFailure={this.state.createFailure} />
      </div>
    )
  }
  
  render() {
    const product = this.props.product;
    return (
      <div className={styles.product}>
        <p className={styles['product__name']}>{product.name}</p>
        {this.generateMacros(product)}
        {this.generateForm(product)}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFoodnote: (data) => dispatch(actions.addFoodnote(data)),
  }
}

export default connect(null, mapDispatchToProps)(ProductListItem);