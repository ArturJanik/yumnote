import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './AccountConfirmation.css';
import axios from '../../utilities/axios-global';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class AccountConfirmation extends Component {
  state = {
    loading: true,
    error: '',
    success: '',
    heading: 'Validating request...'
  }

  showError = (error) => this.setState({loading: false, error, success: '', heading: 'Error'});
  showSuccess = (success, heading) => this.setState({loading: false, error: '', success, heading});

  handleAjaxError = (err) => {
    if(err.response.status === 500){
      this.showError('Unable to reach server. Please try again later');
    } else {
      this.showError('Token invalid or does not exist in database.');
    }
  }

  confirmSignup = (token) => {
    axios.post('/api/user/confirm', {token})
    .then(res => {
      this.showSuccess('Signup confirmed successfully. Now you can login', 'Signup confirmed');
    })
    .catch(this.handleAjaxError);
  }

  reportFraud = (token) => {
    axios.post('/api/user/fraud', {token})
    .then(res => {
      this.showSuccess('Fraud reported successfully. Account connected to your e-mail will no longer be able to login, and your e-mail address will be removed from our database.', 'Fraud reported');
    })
    .catch(this.handleAjaxError);
  }

  checkTokenValidity = (token) => {
    switch (this.props.confType) {
      case 'confirmation':
      default:
        document.title = 'Account signup confirmation - calories.today';
        this.confirmSignup(token);
        break;
      case 'report':
        document.title = 'Signup fraud report - calories.today';
        this.reportFraud(token);
        break;
    }
  }

  componentDidMount(){
    const { token } = this.props.match.params;
    setTimeout(() => {
      
      if(token.trim().length !== 20) {
        this.showError('Incorrect or no token passed.')
      } else {
        this.checkTokenValidity(token);
      }
    }, 1000);
  }

  render(){
    const error = (this.state.error !== '') ? <p className={styles['msg--error']}>{this.state.error}</p> : '';
    const success = (this.state.success !== '') ? <p className={styles['msg--success']}>{this.state.success}</p> : '';
    const loading = this.state.loading ? <Spinner type="center" /> : '';
    const btn = !this.state.loading ? <Link to="/"><Button>Back to homepage</Button></Link> : '';
    return(
      <section className={styles['confirmation__container']}>
        <div className={styles['confirmation__wrapper']}>
          <h1>{this.state.heading}</h1>
          {loading}
          {error}
          {success}
          {btn}
        </div>
      </section>
    )
  }
}

export default AccountConfirmation;