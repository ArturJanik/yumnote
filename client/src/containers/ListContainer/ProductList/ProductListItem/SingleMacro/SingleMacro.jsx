import React from 'react';
import styles from './SingleMacro.css';

const singleMacro = (props) => {
  return (
    <div className={styles.macro}>
      <p className={styles['macro-header']}>{props.name}:</p>
      <p className={styles['macro-value']}>{props.val * props.amount}</p>
    </div>
  )
}

export default singleMacro;