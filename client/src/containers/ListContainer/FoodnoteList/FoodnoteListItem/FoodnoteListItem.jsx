import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './FoodnoteListItem.css';
import * as actions from '../../../../store/actions/index';

import FoodnoteActions from './FoodnoteActions/FoodnoteActions';
import FoodnoteData from './FoodnoteData/FoodnoteData';

class FoodnoteListItem extends Component {
  state = {
    amount: 0.0
  }

  componentDidMount() {
    this.setState({amount: this.props.foodnote.amount})
  }

  onAmountChange = (event) => {
    this.setState({amount: event.target.value})
  }

  onAmountInputBlur = (event) => {
    if(String(this.props.foodnote.amount) !== String(event.target.value))
      this.props.updateFoodnote(this.props.foodnote.id, event.target.value);
  }
  
  render() {
    const foodnote = this.props.foodnote;
    return (
      <div className={styles.foodnote}>
        <div className={styles['foodnote__name']}>{foodnote.product.name}</div>
        <FoodnoteData foodnote={foodnote} amount={this.state.amount} onChange={this.onAmountChange} onBlur={this.onAmountInputBlur} />
        <FoodnoteActions deleteInProgress={foodnote.deleteInProgress} onDeleteClicked={() => this.props.deleteFoodnote(foodnote.id)} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateFoodnote: (id, amount) => dispatch(actions.updateFoodnote(id, amount)),
    deleteFoodnote: (id) => dispatch(actions.deleteFoodnote(id)),
  }
}

export default connect(null, mapDispatchToProps)(FoodnoteListItem);