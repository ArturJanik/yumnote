import React, { PureComponent } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import DatePicker from '../../DatePicker/DatePicker';
import styles from './FoodnoteDateButtons.css';

class FoodnoteDateButtons extends PureComponent {
  render(){
    return(
      <div className={styles['foodnote__list__datebtns']}>
        <NavLink to="/foodnotes/today" className={styles['btn__day']} activeClassName={styles['btn__day--active']} title="Today foodnotes">Today</NavLink>
        <NavLink to="/foodnotes/yesterday" className={styles['btn__day']} activeClassName={styles['btn__day--active']} title="Yesterday foodnotes">Yesterday</NavLink>
        <DatePicker className={this.props.otherDaySelected ? styles['btn__day--active'] : styles['btn__day']} onDateSelected={this.props.onDateSelected}>Other</DatePicker>
      </div>
    )
  }
}

export default withRouter(FoodnoteDateButtons);