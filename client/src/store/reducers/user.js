import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL
} from '../actions/actionTypes';
import { updateObject } from '../../utilities/utility';

const initialState = {
  error: null,
  loading: false,
  profile: null
}


const fetchProfileStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

const fetchProfileSuccess = (state, action) => {
  return updateObject(state, {
    profile: action.profile,
    error: null,
    loading: false
  })
}

const fetchProfileFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_START: return fetchProfileStart(state, action);
    case FETCH_PROFILE_SUCCESS: return fetchProfileSuccess(state, action);
    case FETCH_PROFILE_FAIL: return fetchProfileFail(state, action);

    default: return state;
  }
}

export default reducer;