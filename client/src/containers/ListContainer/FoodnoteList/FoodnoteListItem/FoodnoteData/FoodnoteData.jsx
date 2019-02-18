import React from 'react';
import styles from './FoodnoteData.css';

const foodnoteData = (props) => {
  const foodnote = props.foodnote;
  return (
    <div className={styles['foodnote-product-data']}>
      <div className={styles.wide}>
        <input type="text" 
          value={props.amount} 
          onChange={props.onChange} 
          onBlur={props.onBlur} 
          disabled={foodnote.updateInProgress || foodnote.deleteInProgress} 
        />
        <span>{foodnote.product.unit}</span>
      </div>
      <div>{foodnote.product.kcal * props.amount}</div>
      <div>{foodnote.product.carb * props.amount}</div>
      <div>{foodnote.product.fat * props.amount}</div>
      <div>{foodnote.product.prot * props.amount}</div>
    </div>
  )
}

export default foodnoteData;