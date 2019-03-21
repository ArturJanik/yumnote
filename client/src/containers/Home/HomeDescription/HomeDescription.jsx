import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './HomeDescription.css';

class HomeDescription extends PureComponent {
  render(){
    return (
      <div className={styles['home__description']}>
        <h1>Take control over your diet</h1>
        <p className={styles['home__subtitle']}>Don't let your diet control your life. Keep track of your diet with <span>calories.today</span> - simple calories tracking web application!</p>
        <ul>
          <li><FontAwesomeIcon icon={['far', 'check-square']} />xxx foods available...</li>
          <li><FontAwesomeIcon icon={['far', 'check-square']} />...and why not add some of your favorites?</li>
          <li><FontAwesomeIcon icon={['far', 'check-square']} />focus on most important macros</li>
          <li><FontAwesomeIcon icon={['far', 'check-square']} />fully responsive</li>
        </ul>
      </div>
    )
  }
}

export default HomeDescription;