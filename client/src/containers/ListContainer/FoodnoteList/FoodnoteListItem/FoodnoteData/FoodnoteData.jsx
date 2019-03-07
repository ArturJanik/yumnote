import React, { PureComponent } from 'react';
import styles from './FoodnoteData.css';

class FoodnoteData extends PureComponent {
  render(){
    const { foodnote, amount, onBlur, onChange} = this.props;
    return (
      <div className={styles['foodnote__data']}>
        <div className={styles.wide}>
          <input type="text" 
            value={amount} 
            onChange={onChange} 
            onBlur={onBlur} 
            disabled={foodnote.updateInProgress || foodnote.deleteInProgress} 
          />
          <span>{foodnote.product.unit}</span>
        </div>
        <div className={styles.normal}><span>kcal</span>{(foodnote.product.kcal * amount).toFixed(2)}</div>
        <div className={styles.normal}><span>carb</span>{(foodnote.product.carb * amount).toFixed(2)}</div>
        <div className={styles.normal}><span>fat</span>{(foodnote.product.fat * amount).toFixed(2)}</div>
        <div className={styles.normal}><span>prot</span>{(foodnote.product.prot * amount).toFixed(2)}</div>
      </div>
    )
  }
}

export default FoodnoteData;