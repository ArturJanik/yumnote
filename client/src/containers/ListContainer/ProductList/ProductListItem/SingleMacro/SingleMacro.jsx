import React from 'react';
import styles from './SingleMacro.css';

const singleMacro = (props) => {
  return (
    <div className={styles.macro}>
      <p className={styles['macro__header']}>{props.name}:</p>
      <p className={styles['macro__value']}>{(props.val * props.amount).toFixed(2)}</p>
    </div>
  )
}

export default singleMacro;