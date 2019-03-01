import {
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  RESET_CHANGE_PASSWORD_STATUS,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
} from '../actions/actionTypes';
import { updateObject } from '../../utilities/utility';

const initialState = {
  error: null,
  message: null,
  loading: false,
  passwordChangeSuccess: false,
}

const changePasswordStart = (state, action) => {
  return updateObject(state, { 
    error: null, loading: true, 
    passwordChangeSuccess: false 
  })
}

const changePasswordSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    passwordChangeSuccess: true
  })
}

const changePasswordFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    passwordChangeSuccess: false
  })
}

const resetChangePasswordStatus = (state, action) => {
  return updateObject(state, {
    passwordChangeSuccess: false
  })
}

const forgotPasswordStart = (state, action) => {
  return updateObject(state, { 
    error: null, loading: true, message: null 
  })
}

const forgotPasswordSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    message: action.message
  })
}

const forgotPasswordFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    message: null
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_PASSWORD_START: return changePasswordStart(state, action);
    case CHANGE_PASSWORD_SUCCESS: return changePasswordSuccess(state, action);
    case CHANGE_PASSWORD_FAIL: return changePasswordFail(state, action);
    case RESET_CHANGE_PASSWORD_STATUS: return resetChangePasswordStatus(state, action);

    case FORGOT_PASSWORD_START: return forgotPasswordStart(state, action);
    case FORGOT_PASSWORD_SUCCESS: return forgotPasswordSuccess(state, action);
    case FORGOT_PASSWORD_FAIL: return forgotPasswordFail(state, action);
    default: return state;
  }
}

export default reducer;