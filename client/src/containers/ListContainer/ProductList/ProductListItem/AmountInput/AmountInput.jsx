import React, { PureComponent } from 'react';
import styles from './AmountInput.css';

class AmountInput extends PureComponent {
  render(){
    return (
      <div className={styles['amount__input']}>
        <input type="text" onChange={this.props.onChange} placeholder="Amount" value={this.props.amount} disabled={this.props.inProgress} onKeyUp={this.props.onKeyUp} />
        <p className={styles['amount__unit']}>{this.props.unit}</p>
      </div>
    )
  }
}

export default AmountInput;