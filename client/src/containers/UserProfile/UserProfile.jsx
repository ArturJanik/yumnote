import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './UserProfile.css';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import NoMatch from '../../components/Error/NoMatch';
import ProfileButtons from './ProfileButtons/ProfileButtons';

class UserProfile extends Component {
  
  componentDidMount() {
    document.title = 'My user profile - calories.today'
    this.props.fetchProfile();
  }

  renderProfile = () => {
    return (
      <React.Fragment>
        <div className={styles['profile__data']}>
          <p><strong>Username:</strong> {this.props.profile.username}</p>
          <p><strong>E-mail:</strong> {this.props.profile.email}</p>
          <p><strong>Timezone:</strong> {this.props.profile.time_zone}</p>
        </div>
        <ProfileButtons />
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
      <section className={styles['profile__container']}>
        <div className={styles['profile__wrapper']}>
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