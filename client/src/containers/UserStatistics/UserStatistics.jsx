import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './UserStatistics.css';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import NoMatch from '../../components/Error/NoMatch';
import Chart from './Chart/Chart';

class UserStatistics extends Component {
  
  componentDidMount() {
    document.title = 'My statistics - calories.today'
    if(this.props.statisticalData === null){
      this.props.fetchStatistics();
    }
  }

  renderStatistics = () => {
    return (
      <React.Fragment>
        <div className={styles['chart__container']}>
          {(this.props.statisticalData !== null && this.props.statisticalData.length > 0) ? <Chart data={this.props.statisticalData} /> : 'No data available. Be sure to add some foodnotes!'}
        </div>
        <div className={styles.buttons}>
          <Link to="/profile" title="Back to your profile"><Button btnType="regular">Back to profile</Button></Link>
        </div>
      </React.Fragment>
    )
  }

  render(){
    let statisticsContainer = <Spinner />;
    
    if(!this.props.loading){
      statisticsContainer = this.renderStatistics();
    } else if(this.props.error !== null) {
      return <NoMatch />;
    }
    
    return(
      <section className={styles['statistics__container']}>
        <div className={styles['statistics__wrapper']}>
          <h1>Statistics</h1>
          <div>
            {statisticsContainer}
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    statisticalData: state.user.statisticalData,
    loading: state.user.loading,
    error: state.user.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchStatistics: () => dispatch(actions.fetchStatistics())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserStatistics);