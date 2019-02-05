import React from 'react';
import styles from './Button.css';

const button = (props) => {
  let btnType = props.btnType || 'regular';

  if(btnType.split(' ').length > 1){
    btnType = btnType.split(' ').join('--');
    console.log(btnType)
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