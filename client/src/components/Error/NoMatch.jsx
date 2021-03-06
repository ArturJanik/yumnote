import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NoMatch.css';
import nomatch from './../../assets/images/error_404.jpg';

const noMatch = (props) => {
  useEffect(() => {
    document.title = '404 - page not found - calories.today';
  })
  
  return(
    <div className={styles.error404}>
      <img src={nomatch} alt="Error 404 - page not found" />
      <Link to="/" title="Back to home page">Click to go back to home page</Link>
    </div>
  )
};

export default noMatch;