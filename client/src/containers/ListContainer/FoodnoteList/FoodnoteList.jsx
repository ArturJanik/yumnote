import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './FoodnoteList.css';
import * as actions from '../../../store/actions/index';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FoodnoteDateButtons from './FoodnoteDateButtons/FoodnoteDateButtons';
import FoodnoteListHeader from './FoodnoteListHeader/FoodnoteListHeader';
import FoodnoteListItem from './FoodnoteListItem/FoodnoteListItem';

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

  refreshList = () => {
    this.props.fetchFoodnotes(this.props.day);
    this.props.fetchCategories();
  }
  
  renderError() {
    let button = <Button btnType="refresh" clicked={this.refreshList}>Refresh</Button>;
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

  renderFoodnotes() {
    return this.props.foodnotes.map((foodnote, index) => <FoodnoteListItem key={foodnote.id} foodnote={foodnote} />)
  }

  dateSelected = (date) => {
    this.props.history.push(`/foodnotes/${date}`);
    this.setState({ otherDaySelected: true });
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

    const totals = { ...this.props.totals };

    return(
      <article className={styles['foodnote__list']}>
        <div className={styles['foodnote__list__title']}>
          <div className={styles['btn--menu__category']} onClick={this.props.categoryMenuClicked}>Categories</div>
          <h1>{this.props.title}</h1>
          <FoodnoteDateButtons onDateSelected={this.dateSelected} otherDaySelected={this.state.otherDaySelected} />
        </div>
        <FoodnoteListHeader totals={totals} />
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