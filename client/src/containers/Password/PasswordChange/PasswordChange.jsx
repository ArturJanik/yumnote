import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './PasswordChange.css';

import * as actions from '../../../store/actions/index';
import Form from '../../../components/Form/Form';
import Button from '../../../components/UI/Button/Button';

class PasswordChange extends Component {

  state = {
    fields: {
      old_password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Old password",
          name: "user[password]"
        },
        label: "Old password",
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      new_password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "New Password",
          name: "user[new_password]"
        },
        label: "New password",
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      new_password_confirmation: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Repeat new password",
        },
        label: "New password confirmation",
        confirms: 'new_password',
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    }
  }
  
  componentDidMount() {
    document.title = 'Change password - calories.today'
  }

  componentWillUnmount() {
    this.props.resetPasswordReducerState();
  }

  generateButton = () => {
    let button = (
      <Button btnType="regular">Save new password</Button>
    );
    if (this.props.loading) {
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
            let errorMsgs = '';
            if(this.props.error[field] instanceof Object) {
              errorMsgs = this.props.error[field].map((err, key) => (
                <li key={'msg' + Math.floor(Math.random() * 47589)}>- {err}</li>
              ));
            } else {
            errorMsgs = (<li>- ${this.props.error[field]}</li>);
            }
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

  renderForm = () => {
    const button = this.generateButton();
    const errorMessage = this.generateErrorMsg();

    return <Form
      fields={this.state.fields}
      loading={this.props.loading}
      submitBtn={button}
      errors={errorMessage}
      submitHandler={data => this.props.changePassword(data)}
    />
  }

  showSuccessMsg = () => {
    return <p className={styles['msg--success']}><strong>Password updated successfully.</strong></p>;
  }

  render(){
    let form = this.props.finished ? this.showSuccessMsg() : this.renderForm();
    
    return(
      <section className={styles['profile__container']}>
        <div className={styles['profile__wrapper']}>
          <h1>Change password</h1>
          {form}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.password.loading,
    error: state.password.error,
    finished: state.password.passwordChangeSuccess
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePassword: (formdata) => dispatch(actions.changePassword(formdata)),
    resetPasswordReducerState: () => dispatch(actions.resetPasswordReducerState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);