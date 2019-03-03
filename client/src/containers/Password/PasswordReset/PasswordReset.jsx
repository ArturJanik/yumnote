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
    password: '',
    passValid: false,
    passTouched: false,
    token: null,
    passValidator: {
      required: true,
      minLength: 6
    }
  }

  componentDidMount() {
    document.title = 'Reset password - with calories.today';

    const { token } = this.props.match.params;
    this.setState({token})
  }
  
  componentWillUnmount() {
    this.props.resetPasswordReducerState();
  }

  generateButton = () => {
    let { passValid, passTouched } = this.state;
    let button = (
      <Button disabled={!passValid || !passTouched} btnType="auth" clicked={this.onFormSubmit}>Reset password</Button>
    );
    if (this.props.loading) {
      button = <Button btnType="auth loading">Validating...</Button>;
    }
    return button;
  };

  onChange = (event) => {
    const value = event.target.value;
    this.setState({
      password: value,
      passValid: validateField(value, this.state.passValidator),
      passTouched: true
    })
  }

  onFormSubmit = () => {
    this.props.resetPassword(this.state.password, this.state.token)
  }

  generateForm = () => {
    const btn = this.generateButton();
    return (
      <React.Fragment>
        <Input 
          elementType="input"
          label="New password" 
          value={this.state.password} 
          changed={this.onChange} 
          invalid={!this.state.passValid}
          touched={this.state.passTouched}
          shouldValidate={this.state.passValidator}
          elementConfig={{type: 'password', placeholder: "Enter new password"}}
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
    resetPassword: (password, token) => dispatch(actions.resetPassword(password, token)),
    resetPasswordReducerState: () => dispatch(actions.resetPasswordReducerState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PasswordReset));