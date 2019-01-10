import * as actionTypes from './actionTypes';
import axios from '../../shared/axios-global';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (idToken, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    username
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
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
    axios.defaults.headers['Authorization'] = `Token ${localStorage.getItem('token')}`;
    axios.defaults.headers['token'] = localStorage.getItem('token');
  })
  .catch(err => {
    console.error('Logout error: ', err.response.data.errors);
  });
  return {
    type: actionTypes.AUTH_LOGOUT
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
      console.log('Login successfull: ', response);
      const expirationDate = new Date(new Date().getTime() + 86400000);
      const token = response.data.token;
      const username = response.data.username;
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('currentUserName', username);
      axios.defaults.headers['Authorization'] = `Token ${token}`;
      axios.defaults.headers['token'] = token;
      dispatch(authSuccess(token, username));
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

export const resetAuth = () => {
  return {
    type: actionTypes.AUTH_RESET
  }
}