import React from 'react';
import styles from './Spinner.css';

const spinner = (props) => {
  const classes = props.type ? styles["spinner--" + props.type] : styles.spinner
  return <div className={classes}></div>
};

export default spinner;