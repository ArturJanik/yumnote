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
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Username",
          name: "user[username]"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false,
        formType: "signup"
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-Mail Address",
          name: "user[email]"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
          name: "user[password]"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      time_zone: {
        elementType: "select",
        elementConfig: {
          placeholder: "Your timezone",
          name: "user[time_zone]",
          options: [
            {value: "Etc/UTC",displayValue: "UTC"},
            {value: "Africa/Algiers",displayValue: "Africa/Algiers"},
            {value: "Africa/Cairo",displayValue: "Africa/Cairo"},
            {value: "Africa/Casablanca",displayValue: "Africa/Casablanca"},
            {value: "Africa/Harare",displayValue: "Africa/Harare"},
            {value: "Africa/Johannesburg",displayValue: "Africa/Johannesburg"},
            {value: "Africa/Monrovia",displayValue: "Africa/Monrovia"},
            {value: "Africa/Nairobi",displayValue: "Africa/Nairobi"},
            {value: "America/Argentina/Buenos_Aires",displayValue: "America/Argentina/Buenos_Aires"},
            {value: "America/Bogota",displayValue: "America/Bogota"},
            {value: "America/Caracas",displayValue: "America/Caracas"},
            {value: "America/Chicago",displayValue: "America/Chicago"},
            {value: "America/Chihuahua",displayValue: "America/Chihuahua"},
            {value: "America/Denver",displayValue: "America/Denver"},
            {value: "America/Godthab",displayValue: "America/Godthab"},
            {value: "America/Guatemala",displayValue: "America/Guatemala"},
            {value: "America/Guyana",displayValue: "America/Guyana"},
            {value: "America/Halifax",displayValue: "America/Halifax"},
            {value: "America/Indiana/Indianapolis",displayValue: "America/Indiana/Indianapolis"},
            {value: "America/Juneau",displayValue: "America/Juneau"},
            {value: "America/La_Paz",displayValue: "America/La_Paz"},
            {value: "America/Lima",displayValue: "America/Lima"},
            {value: "America/Los_Angeles",displayValue: "America/Los_Angeles"},
            {value: "America/Mazatlan",displayValue: "America/Mazatlan"},
            {value: "America/Mexico_City",displayValue: "America/Mexico_City"},
            {value: "America/Monterrey",displayValue: "America/Monterrey"},
            {value: "America/Montevideo",displayValue: "America/Montevideo"},
            {value: "America/New_York",displayValue: "America/New_York"},
            {value: "America/Phoenix",displayValue: "America/Phoenix"},
            {value: "America/Regina",displayValue: "America/Regina"},
            {value: "America/Santiago",displayValue: "America/Santiago"},
            {value: "America/Sao_Paulo",displayValue: "America/Sao_Paulo"},
            {value: "America/St_Johns",displayValue: "America/St_Johns"},
            {value: "America/Tijuana",displayValue: "America/Tijuana"},
            {value: "Asia/Almaty",displayValue: "Asia/Almaty"},
            {value: "Asia/Baghdad",displayValue: "Asia/Baghdad"},
            {value: "Asia/Baku",displayValue: "Asia/Baku"},
            {value: "Asia/Bangkok",displayValue: "Asia/Bangkok"},
            {value: "Asia/Chongqing",displayValue: "Asia/Chongqing"},
            {value: "Asia/Colombo",displayValue: "Asia/Colombo"},
            {value: "Asia/Dhaka",displayValue: "Asia/Dhaka"},
            {value: "Asia/Hong_Kong",displayValue: "Asia/Hong_Kong"},
            {value: "Asia/Irkutsk",displayValue: "Asia/Irkutsk"},
            {value: "Asia/Jakarta",displayValue: "Asia/Jakarta"},
            {value: "Asia/Jerusalem",displayValue: "Asia/Jerusalem"},
            {value: "Asia/Kabul",displayValue: "Asia/Kabul"},
            {value: "Asia/Kamchatka",displayValue: "Asia/Kamchatka"},
            {value: "Asia/Karachi",displayValue: "Asia/Karachi"},
            {value: "Asia/Kathmandu",displayValue: "Asia/Kathmandu"},
            {value: "Asia/Kolkata",displayValue: "Asia/Kolkata"},
            {value: "Asia/Krasnoyarsk",displayValue: "Asia/Krasnoyarsk"},
            {value: "Asia/Kuala_Lumpur",displayValue: "Asia/Kuala_Lumpur"},
            {value: "Asia/Kuwait",displayValue: "Asia/Kuwait"},
            {value: "Asia/Magadan",displayValue: "Asia/Magadan"},
            {value: "Asia/Muscat",displayValue: "Asia/Muscat"},
            {value: "Asia/Novosibirsk",displayValue: "Asia/Novosibirsk"},
            {value: "Asia/Rangoon",displayValue: "Asia/Rangoon"},
            {value: "Asia/Riyadh",displayValue: "Asia/Riyadh"},
            {value: "Asia/Seoul",displayValue: "Asia/Seoul"},
            {value: "Asia/Shanghai",displayValue: "Asia/Shanghai"},
            {value: "Asia/Singapore",displayValue: "Asia/Singapore"},
            {value: "Asia/Taipei",displayValue: "Asia/Taipei"},
            {value: "Asia/Tashkent",displayValue: "Asia/Tashkent"},
            {value: "Asia/Tbilisi",displayValue: "Asia/Tbilisi"},
            {value: "Asia/Tehran",displayValue: "Asia/Tehran"},
            {value: "Asia/Tokyo",displayValue: "Asia/Tokyo"},
            {value: "Asia/Ulaanbaatar",displayValue: "Asia/Ulaanbaatar"},
            {value: "Asia/Urumqi",displayValue: "Asia/Urumqi"},
            {value: "Asia/Vladivostok",displayValue: "Asia/Vladivostok"},
            {value: "Asia/Yakutsk",displayValue: "Asia/Yakutsk"},
            {value: "Asia/Yekaterinburg",displayValue: "Asia/Yekaterinburg"},
            {value: "Asia/Yerevan",displayValue: "Asia/Yerevan"},
            {value: "Atlantic/Azores",displayValue: "Atlantic/Azores"},
            {value: "Atlantic/Cape_Verde",displayValue: "Atlantic/Cape_Verde"},
            {value: "Atlantic/South_Georgia",displayValue: "Atlantic/South_Georgia"},
            {value: "Australia/Adelaide",displayValue: "Australia/Adelaide"},
            {value: "Australia/Brisbane",displayValue: "Australia/Brisbane"},
            {value: "Australia/Darwin",displayValue: "Australia/Darwin"},
            {value: "Australia/Hobart",displayValue: "Australia/Hobart"},
            {value: "Australia/Melbourne",displayValue: "Australia/Melbourne"},
            {value: "Australia/Perth",displayValue: "Australia/Perth"},
            {value: "Australia/Sydney",displayValue: "Australia/Sydney"},
            {value: "Europe/Amsterdam",displayValue: "Europe/Amsterdam"},
            {value: "Europe/Athens",displayValue: "Europe/Athens"},
            {value: "Europe/Belgrade",displayValue: "Europe/Belgrade"},
            {value: "Europe/Berlin",displayValue: "Europe/Berlin"},
            {value: "Europe/Bratislava",displayValue: "Europe/Bratislava"},
            {value: "Europe/Brussels",displayValue: "Europe/Brussels"},
            {value: "Europe/Bucharest",displayValue: "Europe/Bucharest"},
            {value: "Europe/Budapest",displayValue: "Europe/Budapest"},
            {value: "Europe/Copenhagen",displayValue: "Europe/Copenhagen"},
            {value: "Europe/Dublin",displayValue: "Europe/Dublin"},
            {value: "Europe/Helsinki",displayValue: "Europe/Helsinki"},
            {value: "Europe/Istanbul",displayValue: "Europe/Istanbul"},
            {value: "Europe/Kiev",displayValue: "Europe/Kiev"},
            {value: "Europe/Lisbon",displayValue: "Europe/Lisbon"},
            {value: "Europe/Ljubljana",displayValue: "Europe/Ljubljana"},
            {value: "Europe/London",displayValue: "Europe/London"},
            {value: "Europe/Madrid",displayValue: "Europe/Madrid"},
            {value: "Europe/Minsk",displayValue: "Europe/Minsk"},
            {value: "Europe/Moscow",displayValue: "Europe/Moscow"},
            {value: "Europe/Paris",displayValue: "Europe/Paris"},
            {value: "Europe/Prague",displayValue: "Europe/Prague"},
            {value: "Europe/Riga",displayValue: "Europe/Riga"},
            {value: "Europe/Rome",displayValue: "Europe/Rome"},
            {value: "Europe/Sarajevo",displayValue: "Europe/Sarajevo"},
            {value: "Europe/Skopje",displayValue: "Europe/Skopje"},
            {value: "Europe/Sofia",displayValue: "Europe/Sofia"},
            {value: "Europe/Stockholm",displayValue: "Europe/Stockholm"},
            {value: "Europe/Tallinn",displayValue: "Europe/Tallinn"},
            {value: "Europe/Vienna",displayValue: "Europe/Vienna"},
            {value: "Europe/Vilnius",displayValue: "Europe/Vilnius"},
            {value: "Europe/Warsaw",displayValue: "Europe/Warsaw"},
            {value: "Europe/Zagreb",displayValue: "Europe/Zagreb"},
            {value: "Pacific/Apia",displayValue: "Pacific/Apia"},
            {value: "Pacific/Auckland",displayValue: "Pacific/Auckland"},
            {value: "Pacific/Chatham",displayValue: "Pacific/Chatham"},
            {value: "Pacific/Fakaofo",displayValue: "Pacific/Fakaofo"},
            {value: "Pacific/Fiji",displayValue: "Pacific/Fiji"},
            {value: "Pacific/Guadalcanal",displayValue: "Pacific/Guadalcanal"},
            {value: "Pacific/Guam",displayValue: "Pacific/Guam"},
            {value: "Pacific/Honolulu",displayValue: "Pacific/Honolulu"},
            {value: "Pacific/Majuro",displayValue: "Pacific/Majuro"},
            {value: "Pacific/Midway",displayValue: "Pacific/Midway"},
            {value: "Pacific/Noumea",displayValue: "Pacific/Noumea"},
            {value: "Pacific/Pago_Pago",displayValue: "Pacific/Pago_Pago"},
            {value: "Pacific/Port_Moresby",displayValue: "Pacific/Port_Moresby"},
            {value: "Pacific/Tongatapu",displayValue: "Pacific/Tongatapu"}
          ]
        },
        label: "Your timezone",
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        formType: "signup"
      }
    },
    isSignup: false
  };

  componentDidMount() {
    this.setState({ isSignup: this.props.signUp });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.signUp !== state.isSignup) {
      return { ...state, isSignup: props.signUp };
    }
    return state;
  }

  switchAuthModeHandler = () => {
    this.props.onAuthModeChange();
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
    const path = this.state.isSignup ? "/login" : "/register";
    this.props.history.push(path);
  };

  generateButton = () => {
    let button = (
      <Button btnType="auth--submit">
        {this.state.isSignup ? "Register" : "Login"}
      </Button>
    );
    if (this.props.loading) {
      button = <Button btnType="auth--submit loading">Connecting...</Button>;
    }
    return button;
  };

  generateErrorMsg = () => {
    let errorMessage = null;
    if (!this.props.error) return errorMessage;
    if (this.props.error instanceof Object) {
      let errorFields = Object.keys(this.props.error);

      errorMessage = (
        <div className={styles["error-container"]}>
          {errorFields.map((field, index) => {
            let errorMsgs = this.props.error[field].map((err, key) => (
              <li key={key}>- {err}</li>
            ));
            return (
              <React.Fragment key={index}>
                <p className={styles["error-subject"]}>{field}</p>
                <ul>{errorMsgs}</ul>
              </React.Fragment>
            );
          })}
        </div>
      );
    } else {
      errorMessage = (
        <div className={styles["error-container"]}>
          <p>{this.props.error}</p>
        </div>
      );
    }
    return errorMessage;
  };

  render() {
    const button = this.generateButton();
    const errorMessage = this.generateErrorMsg();

    const form = (
      <Form
        fields={this.state.fields}
        loading={this.props.loading}
        submitBtn={button}
        errors={errorMessage}
        submitHandler={data => this.props.onAuth(data, this.state.isSignup)}
        formType={this.state.isSignup ? "signup" : "login"}
      />
    );

    const authModeBtn = (
      <Button btnType="auth-link" clicked={this.switchAuthModeHandler}>
        {this.state.isSignup
          ? "Already have an account? Login!"
          : "No account yet? Create a new account!"}
      </Button>
    );

    return (
      <React.Fragment>
        <p className={styles["auth-form-title"]}>
          {this.state.isSignup ? "Signup" : "Login"}
        </p>
        {form}
        {!this.props.loading ? authModeBtn : null}
      </React.Fragment>
    );
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
