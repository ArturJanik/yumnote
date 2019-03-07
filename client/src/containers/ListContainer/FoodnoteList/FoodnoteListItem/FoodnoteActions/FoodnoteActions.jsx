import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './FoodnoteActions.css';

import MiniSpinner from '../../../../../components/UI/MiniSpinner/MiniSpinner';

class FoodnoteActions extends PureComponent {
  render(){
    return (
      <div className={styles['foodnote__actions']}>
        {this.props.deleteInProgress ? (
          <div className={styles['action--delete--spinning']}>
            <MiniSpinner />deleting...
          </div>
        ) : (
          <div className={styles['action--delete']} onClick={() => this.props.onDeleteClicked(this.props.foodnoteId)}>
            <FontAwesomeIcon icon="trash" />delete
          </div>
        )}
      </div>
    )
  }
}

export default FoodnoteActions;