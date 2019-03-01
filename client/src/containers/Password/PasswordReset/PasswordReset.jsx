import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import styles from './PasswordReset.css';
import * as actions from '../../../store/actions/index';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { validateField } from '../../../utilities/form-validation';

class PasswordReset extends Component {
  
  state = {
    email: '',
    emailValid: false,
    emailTouched: false
  }

  componentDidMount() {
    document.title = 'Reset password - with calories.today';
  }

  generateButton = () => {
    let { emailValid, emailTouched } = this.state;
    let button = (
      <Button disabled={!emailValid || !emailTouched} btnType="auth--submit" clicked={this.onFormSubmit}>Reset password</Button>
    );
    if (this.props.loading) {
      button = <Button btnType="auth--submit loading">Validating request...</Button>;
    }
    return button;
  };

  onChange = (event) => {
    const value = event.target.value;
    this.setState({
      email: value,
      emailValid: validateField(value, {
        required: true,
        isEmail: true
      }),
      emailTouched: true
    })
  }

  onFormSubmit = () => {
    this.props.forgotPassword(this.state.email)
  }

  generateForm = () => {
    const btn = this.generateButton();
    return (
      <React.Fragment>
        <Input 
          elementType="input"
          label="Enter your e-mail to reset password" 
          value={this.state.email} 
          changed={this.onChange} 
          invalid={!this.state.emailValid}
          touched={this.state.emailTouched}
          shouldValidate={{
            required: true,
            isEmail: true
          }}
          elementConfig={{placeholder: "E-mail address used to create your account"}}
        />
        {btn}
      </React.Fragment>
    )
  }

  generateError = () => {
    if (!this.props.error) return null;
    
    return (
      <div className={styles["error-container"]}>
        <p>{this.props.error}</p>
      </div>
    );
  }

  generateMessage = () => {
    return (
      <div className={styles["message-container"]}>
        <p>{this.props.message}</p>
      </div>
    )
  }

  render() {
    let authRedirect = null;
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    let form = this.generateForm();
    if(this.props.message !== null) {
      form = this.generateMessage();
    } 
    
    let error = '';
    if(this.props.error !== null) {
      error = this.generateError();
    }

    return(
      <section className={styles.passform}>
        {authRedirect}
        <div className={styles['passform-container']}>
          <p className={styles["passform-title"]}>Reset password</p>
          {form}
          {error}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    authRedirectPath: state.auth.authRedirectPath,
    loading: state.password.loading,
    error: state.password.error,
    message: state.password.message,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: (email) => dispatch(actions.forgotPassword(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PasswordReset));