import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AddButton.css';

import MiniSpinner from '../../../../../components/UI/MiniSpinner/MiniSpinner';

class AddButton extends PureComponent {
  render(){
    const animateCompletion = this.props.createSuccess || this.props.createFailure
    return (
      (this.props.inProgress ?
        (<div className={styles['amount__add']}><MiniSpinner /></div>) :
        (
          <div className={ animateCompletion ? styles['amount__add--finished'] : styles['amount__add']} onClick={animateCompletion ? null : this.props.clicked}>
            <FontAwesomeIcon icon={['far', 'plus-square']} />
            { this.props.createSuccess ? 
              <div className={styles['amount__add__icon--success']}><FontAwesomeIcon icon={['far', 'check-circle']} /></div>
              : this.props.createFailure ? <div className={styles['amount__add__icon--failure']}><FontAwesomeIcon icon={['far', 'times-circle']} /></div> : null
            }
          </div>
        )
      )
    )
  }
}

export default AddButton;