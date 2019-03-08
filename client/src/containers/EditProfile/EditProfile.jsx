import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './EditProfile.css';

import * as actions from '../../store/actions/index';
import Form from '../../components/Form/Form';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';

class EditProfile extends Component {
  state = {
    fields: {
      time_zone: {
        elementType: "timezone",
        elementConfig: {
          placeholder: "Your timezone",
          name: "user[time_zone]",
        },
        label: "Your timezone",
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    fieldsUpdatedWithProfileData: false
  };

  
  componentDidMount() {
    document.title = 'Edit profile - calories.today'
    this.props.fetchProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.profile !== this.props.profile){
      this.updateFields();
    }
  }

  updateFields = () => {
    let fields = this.state.fields;
    for(let key in fields){
      fields = {
        ...fields,
        [key]: {
          ...fields[key],
          value: this.props.profile[key],
          valid: true
        }
      }
    }
    this.setState({fields, fieldsUpdatedWithProfileData: true});
  }

  generateButton = () => {
    let button = (
      <Button>Save changes</Button>
    );
    if(this.props.loading) {
      button = <Button btnType="regular loading">Connecting...</Button>;
    }
    return button;
  };

  generateErrorMsg = () => {
    let errorMessage = null;
    if (!this.props.error) return errorMessage;
    if (this.props.error instanceof Object) {
      let errorFields = Object.keys(this.props.error);

      errorMessage = (
        <div className={styles["error"]}>
          {errorFields.map((field, index) => {
            let errorMsgs = this.props.error[field].map((err, key) => (
              <li key={'msg' + Math.floor(Math.random() * 47589)}>- {err}</li>
            ));
            return (
              <React.Fragment key={'errormsg' + Math.floor(Math.random() * 122345)}>
                <p className={styles["error__subject"]}>{field}</p>
                <ul>{errorMsgs}</ul>
              </React.Fragment>
            );
          })}
        </div>
      );
    } else {
      errorMessage = (
        <div className={styles["error"]}>
          <p>{this.props.error}</p>
        </div>
      );
    }
    return errorMessage;
  };

  render(){
    let form = <Spinner />;
    let errorMessage = null;
    let button = null;

    if(!this.props.loading && this.props.profile !== null && this.state.fieldsUpdatedWithProfileData){
      button = this.generateButton();
      errorMessage = this.generateErrorMsg();
      form = (
        <Form
          fields={this.state.fields}
          loading={this.props.loading}
          submitBtn={button}
          errors={errorMessage}
          submitHandler={data => this.props.updateProfile(data, this.props.profile.id)}
        />
      );
    }
    
    return(
      <section className={styles['profile__container']}>
        <div className={styles['profile__wrapper']}>
          <h1>Edit profile</h1>
          {form}
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
    fetchProfile: () => dispatch(actions.fetchProfile()),
    updateProfile: (data, id) => dispatch(actions.updateProfile(data, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);