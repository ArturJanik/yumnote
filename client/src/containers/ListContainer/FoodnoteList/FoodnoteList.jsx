import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './FoodnoteList.css';
import * as actions from '../../../store/actions/index';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FoodnoteListItem from './FoodnoteListItem/FoodnoteListItem';

class FoodnoteList extends Component {

  componentDidMount() {
    this.props.fetchFoodnotes();
  }

  renderFoodnotes() {
    return this.props.foodnotes.map((foodnote, index) => <FoodnoteListItem key={foodnote.id} foodnote={foodnote} />)
  }

  render(){
    let list = <Spinner />;
    if(!this.props.loading && this.props.error === null) list = this.renderFoodnotes();
    if(this.props.error !== null) list = 'FoodnoteList.jsx error';
    return(
      <article className={styles['foodnote-list']}>
        <div className={styles['list-header']}>
          <h1>{this.props.title}</h1>
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