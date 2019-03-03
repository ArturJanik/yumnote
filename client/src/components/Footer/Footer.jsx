import React from 'react';
import styles from './Footer.css';

import Copyright from './Copyright/Copyright';
import FooterMenu from './FooterMenu/FooterMenu';
import SocialMedia from './SocialMedia/SocialMedia';

const Footer = (props) => (
  <footer>
    <div className={styles['footer__top']}>
      <div className={styles['footer__wrapper']}>
        <FooterMenu></FooterMenu>
      </div>
    </div>
    <div className={styles['footer__bottom']}>
      <div className={styles['footer__wrapper']}>
        <Copyright></Copyright>
        <SocialMedia></SocialMedia>
      </div>
    </div>
  </footer>
);

export default Footer;