import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileButtons.css';
import Button from '../../../components/UI/Button/Button';

class ProfileButtons extends PureComponent {
  render(){
    return(
      <div className={styles['profile__buttons']}>
        <Link to="/profile/edit" title="Edit your profile"><Button btnType="regular">Edit account</Button></Link>
        <Link to="/profile/statistics" title="Visit your profile statistics"><Button btnType="regular">Show statistics</Button></Link>
        <Link to="/profile/update-password" title="Change your password"><Button btnType="regular">Change password</Button></Link>
      </div>
    )
  }
}

export default ProfileButtons;