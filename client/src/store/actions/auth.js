import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_CHECK_FINISHED,
  AUTH_RESET,
  SET_AUTH_REDIRECT_PATH,
} from './actionTypes';
import axios from '../../utilities/axios-global';

export const authStart = () => {
  return {
    type: AUTH_START
  }
}

export const authSuccess = (idToken, username) => {
  return {
    type: AUTH_SUCCESS,
    idToken,
    username
  }
}

export const authFail = (error) => {
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
    axios.defaults.headers['Authorization'] = `Token ${localStorage.getItem('token')}`;
    axios.defaults.headers['token'] = localStorage.getItem('token');
  })
  .catch(err => {
    console.error('Logout error: ', err.response.data.errors);
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

export const authCheckFinished = () => {
  return {
    type: SET_AUTH_CHECK_FINISHED
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('expirationDate');
    const username = localStorage.getItem('currentUserName');
    if(!token || !expDate || !username) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('currentUserName');
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate > new Date()){
        dispatch(authSuccess(token, username));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())));
      } else {
        dispatch(logout());
      }
    }
    dispatch(authCheckFinished());
  }
}

export const resetAuth = () => {
  return {
    type: AUTH_RESET
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path
  }
}