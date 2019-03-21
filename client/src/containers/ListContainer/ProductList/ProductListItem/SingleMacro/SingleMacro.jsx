import React, { PureComponent } from 'react';
import styles from './SingleMacro.css';

class SingleMacro extends PureComponent {
  render(){
    return (
      <div className={styles.macro}>
        <p className={styles['macro__header']}>{this.props.name}:</p>
        <p className={styles['macro__value']}>{(this.props.val * this.props.amount).toFixed(2)}</p>
      </div>
    )
  }
}

export default SingleMacro;