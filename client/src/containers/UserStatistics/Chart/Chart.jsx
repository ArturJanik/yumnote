import React, { Component } from 'react';
import _ from 'lodash';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!perfect-scrollbar/css/perfect-scrollbar.css';
import PerfectScrollbar from 'perfect-scrollbar';
import Chartjs from 'chart.js';
import * as moment from 'moment';
import styles from './Chart.css';

import Button from '../../../components/UI/Button/Button';

class Chart extends Component {

  state = {
    type: 'kcal',
    scale: 'day',
    timespan: 'week',
    startDate: moment().subtract(7, 'days'),
    endDate: moment().subtract(1, 'days'),
  }

  chartRef = React.createRef();
  chartContainerRef = React.createRef();
  chart = null;

  componentDidMount = () => {
    this.generateStats();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.type !== this.state.type || prevState.scale !== this.state.scale || prevState.timespan !== this.state.timespan) {
      this.generateStats();
    }
  }

  narrowDataTimespan = () => {
    const start = this.state.startDate;
    const end = this.state.endDate;

    return _.filter(this.props.data, (dailyData) => {
      const date = moment(dailyData.created_at);
      if(date >= start && date <= end) return dailyData;
    })
  }

  scaleData = (data) => {
    switch (this.state.scale) {
      case 'month':
        data = _.map(data, (dailyData) => ({ ...dailyData, created_at: moment(dailyData.created_at).format('MM/YYYY') }));
        data = _.groupBy(data, 'created_at');
        data = _.reduce(data, (monthlyData, dailyValues, key) => {
          monthlyData[key] = _.reduce(dailyValues, (monthlySum, value, key) => {
            monthlySum['kcal'] = monthlySum['kcal'] + value.kcal;
            monthlySum['carb'] = monthlySum['carb'] + value.carb;
            monthlySum['fat'] = monthlySum['fat'] + value.fat;
            monthlySum['prot'] = monthlySum['prot'] + value.prot;
            return monthlySum;
          }, {kcal: 0, carb: 0, fat: 0, prot: 0});
          return monthlyData;
        }, {});
        break;
      case 'week':
        data = _.map(data, (dailyData) => ({ ...dailyData, dat: dailyData.created_at, created_at: 'week ' + moment(dailyData.created_at).isoWeek() + '/' + moment(dailyData.created_at).isoWeekYear() }));
        data = _.groupBy(data, 'created_at');

        data = _.reduce(data, (weeklyData, dailyValues, key) => {
          weeklyData[key] = _.reduce(dailyValues, (weeklySum, value, key) => {
            weeklySum['kcal'] = weeklySum['kcal'] + value.kcal;
            weeklySum['carb'] = weeklySum['carb'] + value.carb;
            weeklySum['fat'] = weeklySum['fat'] + value.fat;
            weeklySum['prot'] = weeklySum['prot'] + value.prot;
            return weeklySum;
          }, {kcal: 0, carb: 0, fat: 0, prot: 0})
          return weeklyData;
        }, {});
        break;
      default:
        break;
    }
    return data;
  }

  generateLabels = (data) => {
    if(this.state.scale === 'day') {
      return _.map(data, function(item) {
        return moment(item.created_at).format('DD/MM/YYYY');
      });
    } else {
      return _.keys(data);
    }
  }

  getDataOfSelectedType = (data) => {
    let parsedData = [];
    switch (this.state.type) {
      case 'carb':
        parsedData = _.map(data, function(item) {
          return _.floor(item.carb, 2);
        });
        break;
      case 'fat':
        parsedData = _.map(data, function(item) {
          return _.floor(item.fat, 2);
        });
        break;
      case 'prot':
        parsedData = _.map(data, function(item) {
          return _.floor(item.prot, 2);
        });
        break;
      case 'kcal':
      default:
        parsedData = _.map(data, function(item) {
          return _.floor(item.kcal, 2);
        });
        break;
    }
    return parsedData;
  }

  generateStats = () => {
    let data = this.narrowDataTimespan();
    data = this.scaleData(data);
    let labels = this.generateLabels(data);
    data = this.getDataOfSelectedType(data);
    
    this.generateChart(data, labels);
    new PerfectScrollbar(this.chartContainerRef.current, {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20,
      suppressScrollY: true
    });
  }

  generateChart = (data, labels) => {
    if(this.chart !== null) this.chart.destroy();
    this.chart = new Chartjs(this.chartRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          borderColor: "#7a9118",
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        layout: {
          padding: 10
        },
        legend: {
          display: false
        },
				responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true,
              precision: 0
            }
          }]
        }
      }
    });
  }

  changeType = (type) => {
    this.setState({type})
  }

  changeScale = (scale) => {
    this.setState({scale})
  }

  changeTimespan = (timespan) => {
    let startDate, endDate;
    let currentScale = this.state.scale;

    switch (timespan) {
      case 'month':
        if(currentScale === 'month') currentScale = 'week';
        startDate = moment().subtract(31, 'days');
        endDate = moment().subtract(1, 'days');
        break;
      case 'quarter':
        if(currentScale === 'day') currentScale = 'week';
        startDate = moment().subtract(92, 'days');
        endDate = moment().subtract(1, 'days');
        break;
      case 'year':
        if(currentScale === 'day') currentScale = 'month';
        startDate = moment().subtract(365, 'days');
        endDate = moment().subtract(1, 'days');
        break;
      default:
        if(currentScale !== 'day') currentScale = 'day';
        startDate = moment().subtract(7, 'days');
        endDate = moment().subtract(1, 'days');
        break;
    }
    this.setState({timespan, startDate, endDate, scale: currentScale})
  }

  render(){
    return(
      <React.Fragment>
        <div className={styles['controls']}>
          <div className={styles['controls__group']}>
            <p><strong>Data type:</strong></p>
            <Button selected={this.state.type === 'kcal'} clicked={() => this.changeType('kcal')}>Kcal</Button>
            <Button selected={this.state.type === 'carb'} clicked={() => this.changeType('carb')}>Carbs</Button>
            <Button selected={this.state.type === 'fat'} clicked={() => this.changeType('fat')}>Fats</Button>
            <Button selected={this.state.type === 'prot'} clicked={() => this.changeType('prot')}>Proteins</Button>
          </div>
          <div className={styles['controls__group']}>
            <p><strong>Data timespan:</strong></p>
            <Button 
              selected={this.state.timespan === 'week'} 
              clicked={() => this.changeTimespan('week')}>Week</Button>
            <Button 
              selected={this.state.timespan === 'month'} 
              clicked={() => this.changeTimespan('month')}>Month</Button>
            <Button 
              selected={this.state.timespan === 'quarter'} 
              clicked={() => this.changeTimespan('quarter')}>Quarter</Button>
            <Button 
              selected={this.state.timespan === 'year'} 
              clicked={() => this.changeTimespan('year')}>Year</Button>
          </div>
          <div className={styles['controls__group']}>
            <p><strong>Data scaling:</strong></p>
            <Button 
              disabled={['year','quarter'].includes(this.state.timespan)} 
              selected={this.state.scale === 'day'} 
              clicked={() => this.changeScale('day')}>Daily</Button>
            <Button 
              disabled={this.state.timespan === 'week'} 
              selected={this.state.scale === 'week'} 
              clicked={() => this.changeScale('week')}>Weekly</Button>
            <Button 
              disabled={['month','week'].includes(this.state.timespan)} 
              selected={this.state.scale === 'month'} 
              clicked={() => this.changeScale('month')}>Monthly</Button>
          </div>
        </div>
        <div ref={this.chartContainerRef} className={styles['chart__scrollbar__wrapper']}>
          <div className={styles['chart__wrapper']}>
            <canvas ref={this.chartRef} className={styles.chart}/>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Chart;