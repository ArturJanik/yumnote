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
      <div className={styles['error']}>
        <p className={styles['error__message']}>{errorMessage}</p>
        {button}
      </div>
    )
  }

  renderEmpty() {
    return (
      <div className={styles['empty__message']}>
        No foodnotes yet :(<br />Start adding them by selecting one of categories on the right side.
      </div>
    );
  }

  renderListHeader() {
    return (
      <div className={styles['foodnote__list__header']}>
        <div className={styles['header__column1']}>Food</div>
        <div className={styles['header__column2']}>
          <div className={styles['header__labels']}>
            <div className={styles['label__totals']}>Totals</div>
            <div className={styles['label__amount']}>Amount</div>
          </div>
          <div className={styles['totals']}>
            <div className={styles['totals__value']}>{(this.props.totals.kcal).toFixed(2)}</div>
            <div className={styles['totals__value']}>{(this.props.totals.carb).toFixed(2)}g</div>
            <div className={styles['totals__value']}>{(this.props.totals.fat).toFixed(2)}g</div>
            <div className={styles['totals__value']}>{(this.props.totals.prot).toFixed(2)}g</div>
            <div className={styles['totals__type']}>Kcal</div>
            <div className={styles['totals__type']}>Carb</div>
            <div className={styles['totals__type']}>Fat</div>
            <div className={styles['totals__type']}>Prot</div>
          </div>
        </div>
        <div className={styles['header__column3']}>Action</div>
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
      <article className={styles['foodnote__list']}>
        <div className={styles['foodnote__list__title']}>
          <div className={styles['btn--menu__category']} onClick={this.props.categoryMenuClicked}>Categories</div>
          <h1>{this.props.title}</h1>
          <div className={styles['foodnote__list__datebtns']}>
            <NavLink to="/foodnotes/today" className={styles['btn__day']} activeClassName={styles['btn__day--active']} isActive={this.isTodayActive}>Today</NavLink>
            <NavLink to="/foodnotes/yesterday" className={styles['btn__day']} activeClassName={styles['btn__day--active']}>Yesterday</NavLink>
            <DatePicker className={this.state.otherDaySelected ? styles['btn__day--active'] : styles['btn__day']} onDateSelected={this.dateSelected}>Other</DatePicker>
          </div>
        </div>
        {this.renderListHeader()}
        <div className={styles['foodnote__list__body']}>
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
    fetchCategories: () => dispatch(actions.fetchCategories(false)),
    onListLeft: () => dispatch(actions.clearFoodnoteTotals()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FoodnoteList));