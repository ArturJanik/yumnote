import React from 'react';
import styles from './Footer.css';

import Copyright from './Copyright/Copyright';
import FooterMenu from './FooterMenu/FooterMenu';
import SocialMedia from './SocialMedia/SocialMedia';

const Footer = (props) => (
  <footer>
    <div className={styles.wrapper}>
      <FooterMenu></FooterMenu>
      <Copyright></Copyright>
      <SocialMedia></SocialMedia>
    </div>
  </footer>
);

export default Footer;