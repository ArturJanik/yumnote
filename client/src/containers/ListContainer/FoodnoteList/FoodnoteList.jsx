import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './FoodnoteList.css';
import * as actions from '../../../store/actions/index';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FoodnoteListItem from './FoodnoteListItem/FoodnoteListItem';
import DatePicker from '../DatePicker/DatePicker';

class FoodnoteList extends Component {
  state = {
    otherDaySelected: false
  }

  componentDidMount() {
    this.setState({otherDaySelected: (this.props.day !== undefined && this.props.day !== 'yesterday')});
    this.props.fetchFoodnotes(this.props.day);
  }

  componentDidUpdate(prevProps) {
    if(this.props.day !== prevProps.day) {
      if(this.props.day === undefined || this.props.day === 'yesterday') this.setState({otherDaySelected: false});
      this.props.fetchFoodnotes(this.props.day);
    }
  }

  componentWillUnmount() {
    this.props.onListLeft();
  }
  
  renderError() {
    let button = <Button btnType="refresh" clicked={() => { this.props.fetchFoodnotes(this.props.day); this.props.fetchCategories()}}>Refresh</Button>;
    let errorMessage = '';

    if(this.props.loading) {
      button = <Button btnType="refresh loading">Refreshing...</Button>;
    }

    if(this.props.error instanceof Object){
      errorMessage = this.props.error.foodnote[0];
    } else {
      errorMessage = this.props.error;
    }

    return (
      <div className={styles['error-container']}>
        <p className={styles['error-container__message']}>{errorMessage}</p>
        {button}
      </div>
    )
  }

  renderEmpty() {
    return (
      <div className={styles['list-empty']}>
        No foodnotes yet :(<br />Start adding them by selecting one of categories on the right side.
      </div>
    );
  }

  renderListHeader() {
    return (
      <div className={styles['list-header']}>
        <div className={styles['list-header-column1']}>Food</div>
        <div className={styles['list-header-column2']}>
          <div className={styles.wide}>Totals</div>
          <div className={styles.totals}>{this.props.totals.kcal}</div>
          <div className={styles.totals}>{this.props.totals.carb}g</div>
          <div className={styles.totals}>{this.props.totals.fat}g</div>
          <div className={styles.totals}>{this.props.totals.prot}g</div>
          <div className={styles.wide}>Amount</div>
          <div>Kcal</div>
          <div>Carb</div>
          <div>Fat</div>
          <div>Prot</div>
        </div>
        <div className={styles['list-header-column3']}>Action</div>
      </div>
    )
  }

  renderFoodnotes() {
    return this.props.foodnotes.map((foodnote, index) => <FoodnoteListItem key={foodnote.id} foodnote={foodnote} />)
  }

  dateSelected = (date) => {
    this.props.history.push(`/foodnotes/${date}`);
    this.setState({ otherDaySelected: true });
  }

  isTodayActive = (match, location) => {
    return (match || location.pathname === '/')
  }

  render(){
    let list = <Spinner />;
    if(this.props.error !== null) {
      list = this.renderError();
    } else if(!this.props.loading && this.props.foodnotes.length === 0) {
      list = this.renderEmpty();
    } else if(!this.props.loading && this.props.error === null) {
      list = this.renderFoodnotes();
    }

    return(
      <article className={styles['foodnote-list']}>
        <div className={styles['list-title']}>
          <h1>{this.props.title}</h1>
          <div className={styles['foodnote-day']}>
            <NavLink to="/foodnotes/today" className={styles['day-btn']} activeClassName={styles['day-btn--active']} isActive={this.isTodayActive}>Today</NavLink>
            <NavLink to="/foodnotes/yesterday" className={styles['day-btn']} activeClassName={styles['day-btn--active']}>Yesterday</NavLink>
            <DatePicker className={this.state.otherDaySelected ? styles['day-btn--active'] : styles['day-btn']} onDateSelected={this.dateSelected}>Other</DatePicker>
          </div>
        </div>
        {this.renderListHeader()}
        <div className={styles['list-body']}>
          {list}
        </div>
      </article>
    )
  }
}

const mapStateToProps = state => {
  return {
    foodnotes: state.foodnote.foodnotes,
    totals: state.foodnote.totals,
    loading: state.foodnote.loading,
    error: state.foodnote.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFoodnotes: (day) => dispatch(actions.fetchFoodnotes(day)),
    fetchCategories: () => dispatch(actions.fetchCategories()),
    onListLeft: () => dispatch(actions.clearFoodnoteTotals()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FoodnoteList));