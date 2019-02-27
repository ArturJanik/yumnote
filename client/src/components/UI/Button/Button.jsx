import React from 'react';
import styles from './Button.css';

const button = (props) => {
  let btnType = props.btnType || 'regular';

  if(btnType.split(' ').length > 1){
    btnType = btnType.split(' ').join('--');
  }

  return (
    <button
      onClick={props.clicked}
      className={`${styles['btn--' + btnType]} ${props.selected ? styles.selected : ''}`}
      disabled={props.disabled}
    >{props.children}</button>
  )
};

export default button;