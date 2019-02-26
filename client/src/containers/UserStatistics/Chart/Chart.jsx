import React, { Component } from 'react';
import _ from 'lodash';
import Chartjs from 'chart.js';
import styles from './Chart.css';

import Button from '../../../components/UI/Button/Button';


class Chart extends Component {

  chartRef = React.createRef();
  chart = null;

  componentDidMount = () => {
    this.generateYearlyStats();
  }

  generateData = (type) => {
    let data = [];
    switch (type) {
      case 'carb':
        data = _.map(this.props.data, function(value) {
          return _.floor(value.carb, 2);
        });
        break;
      case 'fat':
        data = _.map(this.props.data, function(value) {
          return _.floor(value.fat, 2);
        });
        break;
      case 'prot':
        data = _.map(this.props.data, function(value) {
          return _.floor(value.prot, 2);
        });
        break;
      case 'kcal':
      default:
        data = _.map(this.props.data, function(value) {
          return _.floor(value.kcal, 2);
        });
        break;
    }

    const labels = _.map(this.props.data, function(value) {
      return value.created_at;
    });
      
    return {
      labels,
      datasets: [{
        data,
        borderColor: "#7a9118",
        borderWidth: 2,
        fill: true
      }]
    }
  }

  generateYearlyStats = (type) => {
    if(this.chart !== null) this.chart.destroy();
    const data = this.generateData(type);
    this.chart = new Chartjs(this.chartRef.current, {
      type: 'line',
      data,
      options: {
        animation: {
          duration: 0,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  }

  render(){
    return(
      <React.Fragment>
        <div className={styles.controls}>
          <Button clicked={() => this.generateYearlyStats('kcal')}>Kcal</Button>
          <Button clicked={() => this.generateYearlyStats('carb')}>Carbs</Button>
          <Button clicked={() => this.generateYearlyStats('fat')}>Fats</Button>
          <Button clicked={() => this.generateYearlyStats('prot')}>Proteins</Button>
        </div>
        <canvas ref={this.chartRef}/>
      </React.Fragment>
    )
  }
}

export default Chart;