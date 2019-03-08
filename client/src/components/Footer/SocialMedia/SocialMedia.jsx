import React, { Component } from 'react';
import styles from './SocialMedia.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SocialMedia extends Component {
  render() {
    return (
      <div className={styles['social-container']}>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" title="Our Facebook profile" className={styles['social-icon']}>
          <FontAwesomeIcon icon={['fab', 'facebook']} /></a>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" title="Our Twitter profile" className={styles['social-icon']}>
          <FontAwesomeIcon icon={['fab', 'twitter']} /></a>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" title="Our Tumblr profile" className={styles['social-icon']}>
          <FontAwesomeIcon icon={['fab', 'tumblr']} /></a>
      </div>
    );
  }
}

export default SocialMedia;