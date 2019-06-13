import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MiniSpinner.css';

const miniSpinner = (props) => {
  return <FontAwesomeIcon icon="spinner" className={styles.minispinner} />
};

export default miniSpinner;