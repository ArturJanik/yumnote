import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Actions.css';

import MiniSpinner from '../../../../../components/UI/MiniSpinner/MiniSpinner';

const actions = (props) => {
  return (
    <div className={styles['foodnote-product-actions']}>
      {props.deleteInProgress ? (
        <div className={styles['action-delete']}>
          <MiniSpinner />deleting...
        </div>
      ) : (
        <div className={styles['action-delete']} onClick={props.onDeleteClicked}>
          <FontAwesomeIcon icon="trash" />delete
        </div>
      )
      }
    </div>
  )
}

export default actions;