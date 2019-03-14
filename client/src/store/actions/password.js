import {
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  RESET_PASSWORD_REDUCER_STATE,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from './actionTypes';
import axios from '../../utilities/axios-global';

const changePasswordStart = () => {
  return {
    type: CHANGE_PASSWORD_START
  }
}

const changePasswordSuccess = () => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  }
}

const changePasswordFail = (error) => {
  return {
    type: CHANGE_PASSWORD_FAIL,
    error
  }
}

export const resetPasswordReducerState = () => {
  return {
    type: RESET_PASSWORD_REDUCER_STATE
  }
}

export const changePassword = (formdata) => {
  return dispatch => {
    dispatch(changePasswordStart());
    axios.post('/api/changepassword', formdata)
    .then(response => {
      dispatch(changePasswordSuccess());
    })
    .catch(err => {
      if(err.response.status === 500){
        dispatch(changePasswordFail('Error: unable to reach server. Please try again later'));
      } else {
        dispatch(changePasswordFail(err.response.data.errors));
      }
    });
  }
}

const forgotPasswordStart = () => {
  return {
    type: FORGOT_PASSWORD_START
  }
}

const forgotPasswordSuccess = (message) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    message
  }
}

const forgotPasswordFail = (error) => {
  return {
    type: FORGOT_PASSWORD_FAIL,
    error
  }
}

export const forgotPassword = (email) => {
  return dispatch => {
    dispatch(forgotPasswordStart());
    axios.post('/api/password/forgot', {email})
    .then(response => {
      dispatch(forgotPasswordSuccess(response.data.message));
    })
    .catch(err => {
      if(err.response.status === 500){
        dispatch(forgotPasswordFail('Error: unable to reach server. Please try again later'));
      } else {
        dispatch(forgotPasswordFail(err.response.data.error));
      }
    });
  }
}

const resetPasswordStart = () => {
  return {
    type: RESET_PASSWORD_START
  }
}

const resetPasswordSuccess = (message) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    message
  }
}

const resetPasswordFail = (error) => {
  return {
    type: RESET_PASSWORD_FAIL,
    error
  }
}

export const resetPassword = (password, pass_token) => {
  return dispatch => {
    dispatch(resetPasswordStart());
    axios.post('/api/password/reset', {password, pass_token})
    .then(response => {
      dispatch(resetPasswordSuccess(response.data.message));
    })
    .catch(err => {
      if(err.response.status === 500){
        dispatch(resetPasswordFail('Error: unable to reach server. Please try again later'));
      } else {
        dispatch(resetPasswordFail(err.response.data.error));
      }
    });
  }
}