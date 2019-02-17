import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './FoodnoteList.css';
import * as actions from '../../../store/actions/index';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FoodnoteListItem from './FoodnoteListItem/FoodnoteListItem';

class FoodnoteList extends Component {

  state = {
    total: {
      kcal: 0,
      carb: 0,
      fat: 0,
      prot: 0
    }
  }

  componentDidMount() {
    this.props.fetchFoodnotes();
  }
  
  renderError() {
    let button = <Button btnType="refresh" clicked={this.props.fetchFoodnotes}>Refresh</Button>;
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

  renderFoodnotes() {
    return this.props.foodnotes.map((foodnote, index) => <FoodnoteListItem key={foodnote.id} foodnote={foodnote} />)
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
        </div>
        <div className={styles['list-header']}>
          <div className={styles['list-header-column1']}>Food</div>
          <div className={styles['list-header-column2']}>
            <div className={styles.wide}>Totals</div>
            <div className={styles.totals}>{this.state.total.kcal}</div>
            <div className={styles.totals}>{this.state.total.carb}g</div>
            <div className={styles.totals}>{this.state.total.fat}g</div>
            <div className={styles.totals}>{this.state.total.prot}g</div>
            <div className={styles.wide}>Amount</div>
            <div>Kcal</div>
            <div>Carb</div>
            <div>Fat</div>
            <div>Prot</div>
          </div>
          <div className={styles['list-header-column3']}>Action</div>
        </div>
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
    loading: state.foodnote.loading,
    error: state.foodnote.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFoodnotes: () => dispatch(actions.fetchFoodnotes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodnoteList);