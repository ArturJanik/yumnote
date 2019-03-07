import React, { PureComponent } from 'react';
import styles from './Spinner.css';

class Spinner extends PureComponent {
  render(){
    const classes = this.props.type ? styles["spinner--" + this.props.type] : styles.spinner
    return <div className={classes}></div>
  }
};

export default Spinner;