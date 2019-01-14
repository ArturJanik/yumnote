import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  error: null,
  loading: false,
  currentUser: null,
  authRedirectPath: '/',
  authCheckFinished: false,
}

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, currentUser: null })
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
    currentUser: null
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

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.AUTH_RESET: return authReset(state, action);
    case actionTypes.SET_AUTH_CHECK_FINISHED: return setAuthCheckFinished(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state;
  }
}

export default reducer;