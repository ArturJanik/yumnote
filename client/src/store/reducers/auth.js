import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_CHECK_FINISHED,
  AUTH_RESET,
  SET_AUTH_REDIRECT_PATH,
  PASSCHANGE_START,
  PASSCHANGE_SUCCESS,
  PASSCHANGE_FAIL,
  PASSCHANGE_RESET_STATUS,
} from '../actions/actionTypes';
import { updateObject } from '../../utilities/utility';

const initialState = {
  token: null,
  error: null,
  loading: false,
  currentUser: null,
  authRedirectPath: '/',
  authCheckFinished: false,
  passwordChangeSuccess: false,
}

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, currentUser: null, token: null })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    currentUser: action.username,
    error: null,
    loading: false
  })
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    currentUser: null,
    token: null
  })
}


const setAuthCheckFinished = (state, action) => {
  return updateObject(state, { authCheckFinished: true })
}

const authLogout = (state, action) => {
  return updateObject(state, { token: null, error: null, currentUser: null, authRedirectPath: '/' })
}

const authReset = (state, action) => {
  return authLogout(state, action)
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path })
}


const passchangeStart = (state, action) => {
  return updateObject(state, { 
    error: null, loading: true, 
    passwordChangeSuccess: false 
  })
}

const passchangeSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    passwordChangeSuccess: true
  })
}

const passchangeFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    passwordChangeSuccess: false
  })
}

const passchangeResetStatus = (state, action) => {
  return updateObject(state, {
    passwordChangeSuccess: false
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case AUTH_START: return authStart(state, action);
    case AUTH_SUCCESS: return authSuccess(state, action);
    case AUTH_FAIL: return authFail(state, action);
    case AUTH_LOGOUT: return authLogout(state, action);
    case AUTH_RESET: return authReset(state, action);
    case SET_AUTH_CHECK_FINISHED: return setAuthCheckFinished(state, action);
    case SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    case PASSCHANGE_START: return passchangeStart(state, action);
    case PASSCHANGE_SUCCESS: return passchangeSuccess(state, action);
    case PASSCHANGE_FAIL: return passchangeFail(state, action);
    case PASSCHANGE_RESET_STATUS: return passchangeResetStatus(state, action);
    default: return state;
  }
}

export default reducer;