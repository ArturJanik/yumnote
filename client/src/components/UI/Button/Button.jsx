import React from 'react';
import styles from './Button.css';

const button = (props) => {
  let btnType = props.btnType;

  if(props.btnType.split(' ').length > 1){
    btnType = props.btnType.split(' ').join('--');
  }
  
  return (
    <button
      onClick={props.clicked}
      className={styles['btn--' + btnType]}
      disabled={props.disabled}
    >{props.children}</button>
  )
};

export default button;