import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AddButton.css';

import MiniSpinner from '../../../../../components/UI/MiniSpinner/MiniSpinner';

const addButton = (props) => {
  return (
    (props.inProgress ?
      (<div className={styles['amount__add']}><MiniSpinner /></div>) :
      (
        <div className={props.created ? styles['amount__add--finished'] : styles['amount__add']} onClick={props.clicked}>
          <FontAwesomeIcon icon={['far', 'plus-square']} />
          <div className={styles['amount__add--success']}><FontAwesomeIcon icon={['far', 'check-circle']} /></div>
        </div>
      )
    )
  )
}

export default addButton;