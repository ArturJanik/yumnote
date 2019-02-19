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
    creationCompleted: false
  }

  componentDidUpdate(prevProps) {
    if(prevProps.createdForProduct === this.props.product.id){
      this.setState({ creationCompleted: true });
      this.timer = setTimeout(() => {
        this.setState({ creationCompleted: false });
      }, 1000);
    }
  }

  componentWillUnmount() {
    if(this.timer) clearTimeout(this.timer);
  }

  submitFoodnote = () => {
    this.setState({ creationCompleted: false });
    const data = {
      product_id: this.props.product.id,
      amount: this.state.amount,
      created_at: this.props.day
    }
    this.props.addFoodnote(data);
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

  generateForm = (product) => {
    const creationInProgress = this.props.createInProgress && (this.props.createdForProduct === product.id);
    return (
      <div className={styles.form}>
        <AmountInput inProgress={creationInProgress} onChange={this.onAmountChange} amount={this.state.amount} unit={product.unit} />
        <AddButton inProgress={creationInProgress} clicked={this.submitFoodnote} created={this.state.creationCompleted} />
      </div>
    )
  }
  
  render() {
    const product = this.props.product;
    return (
      <div className={styles.product}>
        <p className={styles.name}>{product.name}</p>
        {this.generateMacros(product)}
        {this.generateForm(product)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    createInProgress: state.foodnote.createInProgress,
    createdForProduct: state.foodnote.createdForProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFoodnote: (data) => dispatch(actions.addFoodnote(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListItem);