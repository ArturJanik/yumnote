import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './StaticLinks.css';

class StaticLinks extends PureComponent {
  render(){
    return(
      <React.Fragment>
        <li className={styles['category__item--special']}><Link to={`/foodnotes/today`} title="Today foodnotes" onClick={this.props.clicked}>Today</Link></li>
        <li className={styles['category__item--special']}><Link to={`/myfoods`} title="Your products" onClick={this.props.clicked}>My Foods</Link></li>
        <li className={styles['category__item--special']}><Link to={`/latest`} title="Products used by you during last week" onClick={this.props.clicked}>Lately Yummed</Link></li>
      </React.Fragment>
    )
  }
}

export default StaticLinks;