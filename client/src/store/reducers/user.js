import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_STATISTICS_START,
  FETCH_STATISTICS_SUCCESS,
  FETCH_STATISTICS_FAIL,
  CLEAR_STATISTICS,
} from '../actions/actionTypes';
import { updateObject } from '../../utilities/utility';

const initialState = {
  error: null,
  loading: false,
  profile: null,
  statisticalData: null
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


const fetchStatisticsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

const fetchStatisticsSuccess = (state, action) => {
  return updateObject(state, {
    statisticalData: action.stats,
    error: null,
    loading: false
  })
}

const fetchStatisticsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const clearStatistics = (state, action) => {
  return updateObject(state, { statisticalData: null })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_START: return fetchProfileStart(state, action);
    case FETCH_PROFILE_SUCCESS: return fetchProfileSuccess(state, action);
    case FETCH_PROFILE_FAIL: return fetchProfileFail(state, action);

    case FETCH_STATISTICS_START: return fetchStatisticsStart(state, action);
    case FETCH_STATISTICS_SUCCESS: return fetchStatisticsSuccess(state, action);
    case FETCH_STATISTICS_FAIL: return fetchStatisticsFail(state, action);

    case CLEAR_STATISTICS: return clearStatistics(state, action);

    default: return state;
  }
}

export default reducer;