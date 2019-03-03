import React from 'react';
import styles from './FoodnoteData.css';

const foodnoteData = (props) => {
  const foodnote = props.foodnote;
  return (
    <div className={styles['foodnote__data']}>
      <div className={styles.wide}>
        <input type="text" 
          value={props.amount} 
          onChange={props.onChange} 
          onBlur={props.onBlur} 
          disabled={foodnote.updateInProgress || foodnote.deleteInProgress} 
        />
        <span>{foodnote.product.unit}</span>
      </div>
      <div className={styles.normal}><span>kcal</span>{(foodnote.product.kcal * props.amount).toFixed(2)}</div>
      <div className={styles.normal}><span>carb</span>{(foodnote.product.carb * props.amount).toFixed(2)}</div>
      <div className={styles.normal}><span>fat</span>{(foodnote.product.fat * props.amount).toFixed(2)}</div>
      <div className={styles.normal}><span>prot</span>{(foodnote.product.prot * props.amount).toFixed(2)}</div>
    </div>
  )
}

export default foodnoteData;