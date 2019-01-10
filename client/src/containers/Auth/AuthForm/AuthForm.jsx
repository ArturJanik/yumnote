import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './AuthForm.css';

import Form from '../../../components/Form/Form';
import Button from '../../../components/UI/Button/Button';

import * as actions from '../../../store/actions/index';

class AuthForm extends Component {
  state = {
    fields: {
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username',
          name: 'user[username]'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false,
        formType: 'signup'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-Mail Address',
          name: 'user[email]'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
          name: 'user[password]'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: false
  }

  componentDidMount(){
    this.setState({isSignup: this.props.signUp})
  }

  static getDerivedStateFromProps(props, state) {
    if(props.signUp !== state.isSignup){
      return {...state, isSignup: props.signUp};
    }
    return state;
  }

  switchAuthModeHandler = () => {
    this.props.onAuthModeChange();
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup}
    });
    const path = this.state.isSignup ? "/login" : "/register";
    this.props.history.push(path);
  }

  generateButton = () => {
    let button = <Button btnType="auth-success">{this.state.isSignup ? 'Register' : 'Login'}</Button>;
    if(this.props.loading) {
      button = <Button btnType="auth-success loading">Connecting...</Button>;
    }
    return button;
  }

  generateErrorMsg = () => {
    let errorMessage = null;
    if(!this.props.error) return errorMessage;
    if(this.props.error instanceof Object){
      let errorFields = Object.keys(this.props.error);

      errorMessage = (
        <div className={styles.errorContainer}>
          { errorFields.map((field, index) => {
            let errorMsgs = this.props.error[field].map((err, key) => <li key={key}>- {err}</li>);
            return (
              <React.Fragment key={index}>
                <p className={styles.errorSubject}>{field}</p>
                <ul>
                  {errorMsgs}
                </ul>
              </React.Fragment>
            );
          })
        }
        </div>
      );
    } else {
      errorMessage = (
        <p>{this.props.error}</p>
      );
    }
    return errorMessage;
  }

  render(){
    const button = this.generateButton();
    const errorMessage = this.generateErrorMsg();

    const form = <Form 
      fields={this.state.fields}
      loading={this.props.loading}
      submitBtn={button}
      errors={errorMessage}
      submitHandler={(data) => this.props.onAuth(data, this.state.isSignup)}
      formType={this.state.isSignup ? "signup" : "login"}
    />;

    const authModeBtn = <Button btnType="auth-link" clicked={this.switchAuthModeHandler}>{this.state.isSignup ? 'Already have an account? Login!' : 'No account yet? Create a new account!'}</Button>;

    return(
      <React.Fragment>
        <h1>{this.state.isSignup ? 'Register' : 'Login'}</h1>
        {form}
        {authModeBtn}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (formdata, isSignup) => dispatch(actions.auth(formdata, isSignup)),
    onAuthModeChange: () => dispatch(actions.resetAuth()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthForm));
