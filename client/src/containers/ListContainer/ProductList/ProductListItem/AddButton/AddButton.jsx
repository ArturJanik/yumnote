import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AddButton.css';

import MiniSpinner from '../../../../../components/UI/MiniSpinner/MiniSpinner';

const addButton = (props) => {
  return (
    (props.inProgress ?
      <div className={styles['amount-add']}><MiniSpinner /></div>
      : <div className={styles['amount-add']} onClick={props.clicked}><FontAwesomeIcon icon={['far', 'plus-square']} /></div>
    )
  )
}

export default addButton;