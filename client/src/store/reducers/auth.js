import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_CHECK_FINISHED,
  RESET_AUTH_REDUCER_STATE,
  SET_AUTH_REDIRECT_PATH,
  UPDATE_TIMEZONE_SUCCESS,
} from '../actions/actionTypes';
import { updateObject } from '../../utilities/utility';

const initialState = {
  token: null,
  error: null,
  loading: false,
  currentUser: null,
  currentUserTimezone: 'Etc/UTC',
  authRedirectPath: '/',
  authCheckFinished: false,
}

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, currentUser: null, token: null, currentUserTimezone: 'Etc/UTC' })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    currentUser: action.username,
    currentUserTimezone: action.timezone,
    error: null,
    loading: false
  })
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    currentUser: null,
    currentUserTimezone: 'Etc/UTC',
    token: null
  })
}


const setAuthCheckFinished = (state, action) => {
  return updateObject(state, { authCheckFinished: true })
}

const authLogout = (state, action) => {
  return updateObject(state, { token: null, error: null, loading: false, currentUser: null, authRedirectPath: '/', currentUserTimezone: 'Etc/UTC' })
}

const resetReducerState = (state, action) => {
  return { ...initialState, authCheckFinished: state.authCheckFinished }
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path })
}

const setTimezone = (state, action) => {
  let timezone = state.timezone;
  if(action.timezone !== timezone) timezone = action.timezone;
  return updateObject(state, { currentUserTimezone: timezone })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case AUTH_START: return authStart(state, action);
    case AUTH_SUCCESS: return authSuccess(state, action);
    case AUTH_FAIL: return authFail(state, action);
    
    case AUTH_LOGOUT: return authLogout(state, action);
    case SET_AUTH_CHECK_FINISHED: return setAuthCheckFinished(state, action);
    case SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);

    case UPDATE_TIMEZONE_SUCCESS: return setTimezone(state, action);

    case RESET_AUTH_REDUCER_STATE: return resetReducerState(state, action);

    default: return state;
  }
}

export default reducer;