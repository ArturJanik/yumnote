import React, {PureComponent} from 'react';
import styles from './Footer.css';

import Copyright from './Copyright/Copyright';
import FooterMenu from './FooterMenu/FooterMenu';
import SocialMedia from './SocialMedia/SocialMedia';

class Footer extends PureComponent {
  render(){
    return(
      <footer>
        <div className={styles['footer__top']}>
          <div className={styles['footer__wrapper']}>
            <FooterMenu></FooterMenu>
          </div>
        </div>
        <div className={styles['footer__bottom']}>
          <div className={styles['footer__wrapper']}>
            <Copyright></Copyright>
            {/* <SocialMedia></SocialMedia> */}
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;