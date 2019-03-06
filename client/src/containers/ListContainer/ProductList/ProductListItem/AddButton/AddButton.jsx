import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AddButton.css';

import MiniSpinner from '../../../../../components/UI/MiniSpinner/MiniSpinner';

const addButton = (props) => {
  const animateCompletion = props.createSuccess || props.createFailure
  return (
    (props.inProgress ?
      (<div className={styles['amount__add']}><MiniSpinner /></div>) :
      (
        <div className={ animateCompletion ? styles['amount__add--finished'] : styles['amount__add']} onClick={animateCompletion ? null : props.clicked}>
          <FontAwesomeIcon icon={['far', 'plus-square']} />
          { props.createSuccess ? 
            <div className={styles['amount__add__icon--success']}><FontAwesomeIcon icon={['far', 'check-circle']} /></div>
            : props.createFailure ? <div className={styles['amount__add__icon--failure']}><FontAwesomeIcon icon={['far', 'times-circle']} /></div> : null
          }
        </div>
      )
    )
  )
}

export default addButton;