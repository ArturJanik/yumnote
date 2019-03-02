import React from 'react';
import styles from './Button.css';

const button = (props) => {
  const btnType = props.btnType || 'regular';

  // if(btnType.split(' ').length > 1){
    // btnType = btnType.split(' ').join('--');
  // }

  const selected = (props.selected) ? '--selected' : '';

  console.log('btn--' + btnType + selected)
  return (
    <button
      onClick={props.clicked}
      className={`${styles['btn--' + btnType + selected]}`}
      // className={`${styles['btn--' + btnType]} ${props.selected ? styles.selected : ''}`}
      disabled={props.disabled}
    >{props.children}</button>
  )
};

export default button;