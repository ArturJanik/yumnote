import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './MyProfile.css';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import NoMatch from '../../components/Error/NoMatch';

class MyProfile extends Component {
  
  componentDidMount() {
    document.title = 'My user profile - calories.today'
    this.props.fetchProfile();
  }

  renderProfile = () => {
    return (
      <React.Fragment>
        <p><strong>Username:</strong> {this.props.profile.username}</p>
        <p><strong>E-mail:</strong> {this.props.profile.email}</p>
        <p><strong>Timezone:</strong> {this.props.profile.time_zone}</p>
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
        <div className={styles.profile}>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);