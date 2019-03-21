import React, { Component } from 'react';
import _ from 'lodash';
import styles from './FoodnoteListHeader.css';

class FoodnoteListHeader extends Component {

  shouldComponentUpdate(nextProps){
    return !(_.isEqual(nextProps.totals, this.props.totals));
  }

  render(){
    const totals = this.props.totals;
    return(
      <div className={styles['foodnote__list__header']}>
        <div className={styles['header__column1']}>Food</div>
        <div className={styles['header__column2']}>
          <div className={styles['header__labels']}>
            <div className={styles['label__totals']}>Totals</div>
            <div className={styles['label__amount']}>Amount</div>
          </div>
          <div className={styles['totals']}>
            <div className={styles['totals__value']}>{(totals.kcal).toFixed(2)}</div>
            <div className={styles['totals__value']}>{(totals.carb).toFixed(2)}g</div>
            <div className={styles['totals__value']}>{(totals.fat).toFixed(2)}g</div>
            <div className={styles['totals__value']}>{(totals.prot).toFixed(2)}g</div>
            <div className={styles['totals__type']}>Kcal</div>
            <div className={styles['totals__type']}>Carb</div>
            <div className={styles['totals__type']}>Fat</div>
            <div className={styles['totals__type']}>Prot</div>
          </div>
        </div>
        <div className={styles['header__column3']}>Action</div>
      </div>
    )
  }
}

export default FoodnoteListHeader;