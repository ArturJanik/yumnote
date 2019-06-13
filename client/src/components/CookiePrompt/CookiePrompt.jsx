import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookiePrompt.css';

class CookiePrompt extends Component {
  state = {
    showCookiePrompt: false
  }

  componentDidMount(){
    const userDidConsent = localStorage.getItem('caloriestodayCookiesAccepted');
    if(!userDidConsent){
      this.setState({showCookiePrompt: true})
    }
  }

  acceptCookies = () => {
    this.setState({showCookiePrompt: false});
    localStorage.setItem('caloriestodayCookiesAccepted', true);
  }

  render(){
    if(!this.state.showCookiePrompt) return '';
    return (
      <div className={styles['cookies__wrapper']}>
        <p className={styles['cookies__header']}><strong>This site uses cookies</strong></p>
        <div className={styles['cookies__text']}>
          <p>We use non-caloric cookies to provide the best experience to our users. In order to do so, we use cookies to ensure full visual feedback inside web application and analyse how our users use this app (with help of statistical data). We use this data only to plan our development and marketing strategy.</p>
          <Link to="/doc/cookies-policy" title="Cookies Policy" className={styles['cookies__link']}>Find out more about cookies</Link>
        </div>
        <div className={styles['cookies__btn--accept']} onClick={this.acceptCookies}>I understand and accept</div>
        <a href="http://www.google.com" title="Google" className={styles['cookies__btn--decline']}>I understand and do not accept (you will be redirected to Google)</a>
      </div>
    )
  }
}

export default CookiePrompt;