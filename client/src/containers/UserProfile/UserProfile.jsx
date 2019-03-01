import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './UserProfile.css';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import NoMatch from '../../components/Error/NoMatch';

class UserProfile extends Component {
  
  componentDidMount() {
    document.title = 'My user profile - calories.today'
    this.props.fetchProfile();
  }

  renderProfile = () => {
    return (
      <React.Fragment>
        <div className={styles['userdata-container']}>
          <p><strong>Username:</strong> {this.props.profile.username}</p>
          <p><strong>E-mail:</strong> {this.props.profile.email}</p>
          <p><strong>Timezone:</strong> {this.props.profile.time_zone}</p>
        </div>
        <div className={styles['buttons-container']}>
          <Link to="/profile/edit"><Button btnType="profile">Edit account</Button></Link>
          <Link to="/profile/statistics"><Button btnType="profile">Show statistics</Button></Link>
          <Link to="/profile/update-password"><Button btnType="profile">Change password</Button></Link>
        </div>
      </React.Fragment>
    )
  }

  render(){
    let profile = <Spinner />;
    
    if(!this.props.loading && this.props.profile !== null){
      profile = this.renderProfile();
    } else if(this.props.error !== null) {
      return <NoMatch />;
    }
    
    return(
      <section className={styles['profile-container']}>
        <div className={styles.wrapper}>
          <h1>Profile</h1>
          <div>
            {profile}
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    loading: state.user.loading,
    error: state.user.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: () => dispatch(actions.fetchProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);