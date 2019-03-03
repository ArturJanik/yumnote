import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './FoodnoteActions.css';

import MiniSpinner from '../../../../../components/UI/MiniSpinner/MiniSpinner';

const foodnoteActions = (props) => {
  return (
    <div className={styles['foodnote__actions']}>
      {props.deleteInProgress ? (
        <div className={styles['action--delete']}>
          <MiniSpinner />deleting...
        </div>
      ) : (
        <div className={styles['action--delete']} onClick={props.onDeleteClicked}>
          <FontAwesomeIcon icon="trash" />delete
        </div>
      )
      }
    </div>
  )
}

export default foodnoteActions;