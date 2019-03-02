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

const resetReducerState = (state, action) => {
  return updateObject(state, initialState)
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


const resetPasswordStart = (state, action) => {
  return updateObject(state, { 
    error: null, loading: true, message: null 
  })
}

const resetPasswordSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    message: action.message
  })
}

const resetPasswordFail = (state, action) => {
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
    case RESET_PASSWORD_REDUCER_STATE: return resetReducerState(state, action);

    case FORGOT_PASSWORD_START: return forgotPasswordStart(state, action);
    case FORGOT_PASSWORD_SUCCESS: return forgotPasswordSuccess(state, action);
    case FORGOT_PASSWORD_FAIL: return forgotPasswordFail(state, action);

    case RESET_PASSWORD_START: return resetPasswordStart(state, action);
    case RESET_PASSWORD_SUCCESS: return resetPasswordSuccess(state, action);
    case RESET_PASSWORD_FAIL: return resetPasswordFail(state, action);
    default: return state;
  }
}

export default reducer;