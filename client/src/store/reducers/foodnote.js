import {
  FETCH_FOODNOTES_START,
  FETCH_FOODNOTES_SUCCESS,
  FETCH_FOODNOTES_FAIL,
  UPDATE_FOODNOTE_START,
  UPDATE_FOODNOTE_SUCCESS,
  UPDATE_FOODNOTE_FAIL,
} from '../actions/actionTypes';
import { updateObject } from '../../utilities/utility';

const initialState = {
  error: null,
  loading: false,
  foodnotes: []
}


const fetchFoodnotesStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

const fetchFoodnotesSuccess = (state, action) => {
  return updateObject(state, {
    foodnotes: action.foodnotes,
    error: null,
    loading: false
  })
}

const fetchFoodnotesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const updateFoodnoteStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

const updateFoodnoteSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  })
}

const updateFoodnoteFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FOODNOTES_START: return fetchFoodnotesStart(state, action);
    case FETCH_FOODNOTES_SUCCESS: return fetchFoodnotesSuccess(state, action);
    case FETCH_FOODNOTES_FAIL: return fetchFoodnotesFail(state, action);

    case UPDATE_FOODNOTE_START: return updateFoodnoteStart(state, action);
    case UPDATE_FOODNOTE_SUCCESS: return updateFoodnoteSuccess(state, action);
    case UPDATE_FOODNOTE_FAIL: return updateFoodnoteFail(state, action);

    default: return state;
  }
}

export default reducer;