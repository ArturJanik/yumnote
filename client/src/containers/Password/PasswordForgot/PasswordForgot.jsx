import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import styles from './PasswordForgot.css';
import * as actions from '../../../store/actions/index';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { validateField } from '../../../utilities/form-validation';

class PasswordForgot extends Component {
  
  state = {
    email: '',
    emailValid: false,
    emailTouched: false,
    passValidator: {
      required: true,
      isEmail: true
    }
  }

  componentDidMount() {
    document.title = 'Reset password - with calories.today';
  }
  
  componentWillUnmount() {
    this.props.resetPasswordReducerState();
  }

  generateButton = () => {
    let { emailValid, emailTouched } = this.state;
    let button = (
      <Button disabled={!emailValid || !emailTouched} btnType="auth" clicked={this.onFormSubmit}>Reset password</Button>
    );
    if (this.props.loading) {
      button = <Button btnType="auth loading">Validating request...</Button>;
    }
    return button;
  };

  onChange = (event) => {
    const value = event.target.value;
    this.setState({
      email: value,
      emailValid: validateField(value, this.state.passValidator),
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
          shouldValidate={this.state.passValidator}
          elementConfig={{placeholder: "Your account e-mail address"}}
        />
        {btn}
      </React.Fragment>
    )
  }

  generateError = () => {
    if (!this.props.error) return null;
    
    return (
      <div className={styles["error"]}>
        <p>{this.props.error}</p>
      </div>
    );
  }

  generateMessage = () => {
    return (
      <div className={styles["message"]}>
        <p>{this.props.message}</p>
      </div>
    )
  }

  render() {
    if(this.props.isAuthenticated){
      return <Redirect to={this.props.authRedirectPath} />
    }

    let form = (this.props.message === null) ? this.generateForm() : this.generateMessage();
    let error = (this.props.error === null) ? '' : this.generateError();

    return(
      <section className={styles.passform}>
        <div className={styles['passform__container']}>
          <p className={styles["passform__title"]}>Reset password</p>
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
    forgotPassword: (email) => dispatch(actions.forgotPassword(email)),
    resetPasswordReducerState: () => dispatch(actions.resetPasswordReducerState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PasswordForgot));