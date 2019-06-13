import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_CHECK_FINISHED,
  RESET_AUTH_REDUCER_STATE,
  SET_AUTH_REDIRECT_PATH,
} from './actionTypes';
import axios from '../../utilities/axios-global';

const authStart = () => {
  return {
    type: AUTH_START
  }
}

const authSuccess = (idToken, username, timezone) => {
  return {
    type: AUTH_SUCCESS,
    idToken,
    username,
    timezone
  }
}

const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  }
}

export const logout = () => {
  axios.delete('/api/logout')
  .then(response => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentUserTimezone');
    localStorage.removeItem('yearlyStatistics');
    localStorage.removeItem('statisticsFetchDate');
    axios.defaults.headers['Authorization'] = `Token ${localStorage.getItem('token')}`;
    axios.defaults.headers['token'] = localStorage.getItem('token');
  })
  .catch(err => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentUserTimezone');
    localStorage.removeItem('yearlyStatistics');
    localStorage.removeItem('statisticsFetchDate');
    axios.defaults.headers['Authorization'] = `Token ${localStorage.getItem('token')}`;
    axios.defaults.headers['token'] = localStorage.getItem('token');
    console.error('Logout error: ', err);
  });
  return {
    type: AUTH_LOGOUT
  }
}

export const auth = (formdata, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    
    const headers = {
      'Content-Type': 'application/json' 
    };
    let url = '/api/login';

    if(isSignup){
      url = '/api/users';
    }

    axios.post(url, formdata, headers)
    .then(response => {
      const expirationDate = new Date(new Date().getTime() + 86400000);
      const token = response.data.token;
      const username = response.data.username;
      const timezone = response.data.timezone;

      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('currentUserName', username);
      localStorage.setItem('currentUserTimezone', timezone);

      axios.defaults.headers['Authorization'] = `Token ${token}`;
      axios.defaults.headers['token'] = token;

      dispatch(authSuccess(token, username, timezone));
      dispatch(checkAuthTimeout(86400000));
    })
    .catch(err => {
      if(err.response.status === 500){
        dispatch(authFail('Error: unable to reach server. Please try again later'));
      } else {
        dispatch(authFail(err.response.data.errors));
      }
    });
  }
}

const authCheckFinished = () => {
  return {
    type: SET_AUTH_CHECK_FINISHED
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('expirationDate');
    const username = localStorage.getItem('currentUserName');
    const timezone = localStorage.getItem('currentUserTimezone');

    if(!token || !expDate || !username || username === 'undefined' || !timezone || timezone === 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('currentUserName');
      localStorage.removeItem('currentUserTimezone');
      localStorage.removeItem('yearlyStatistics');
      localStorage.removeItem('statisticsFetchDate');
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate > new Date()){
        dispatch(authSuccess(token, username, timezone));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())));
      } else {
        dispatch(logout());
      }
    }
    dispatch(authCheckFinished());
  }
}

export const resetAuthReducerState = () => {
  return {
    type: RESET_AUTH_REDUCER_STATE
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path
  }
}