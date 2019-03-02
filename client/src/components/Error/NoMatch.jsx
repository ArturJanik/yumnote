import React, { useEffect } from 'react';
import styles from './NoMatch.css';
import nomatch from './../../assets/images/error_404.jpg';

const NoMatch = (props) => {
  useEffect(() => {
    document.title = '404 - page not found - calories.today';
  })
  
  return(
    <div className={styles.error404}><img src={nomatch} alt="Error 404 - page not found" /></div>
  )
};

export default NoMatch;