import React from 'react';
import styles from './AmountInput.css';

const amountInput = (props) => {
  return (
    <div className={styles['amount__input']}>
      <input type="text" onChange={props.onChange} placeholder="Amount" value={props.amount} disabled={props.inProgress} />
      <p className={styles['amount__unit']}>{props.unit}</p>
    </div>
  )
}

export default amountInput;