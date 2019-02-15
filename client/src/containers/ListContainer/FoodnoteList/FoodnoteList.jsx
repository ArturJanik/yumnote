import React, { Component } from 'react';
import styles from './FoodnoteList.css';

import FoodnoteListItem from './FoodnoteListItem/FoodnoteListItem';

class FoodnoteList extends Component {
  renderFoodnotes() {
    return this.props.foodnotes.map((foodnote, index) => <FoodnoteListItem key={foodnote.id} foodnote={foodnote} />)
  }

  render(){
    return(
      <article className={styles['foodnote-list']}>
        <div className={styles['list-header']}>
          <h1>{this.props.title}</h1>
        </div>
        <div className={styles['list-body']}>
          {this.renderFoodnotes()}
        </div>
      </article>
    )
  }
}

export default FoodnoteList;