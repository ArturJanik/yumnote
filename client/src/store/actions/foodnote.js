import {
  FETCH_FOODNOTES_START,
  FETCH_FOODNOTES_SUCCESS,
  FETCH_FOODNOTES_FAIL
} from './actionTypes';
import axios from '../../utilities/axios-global';

export const fetchFoodnotesStart = () => {
  return {
    type: FETCH_FOODNOTES_START
  }
}

export const fetchFoodnotesSuccess = (foodnotes) => {
  return {
    type: FETCH_FOODNOTES_SUCCESS,
    foodnotes
  }
}

export const fetchFoodnotesFail = (error) => {
  return {
    type: FETCH_FOODNOTES_FAIL,
    error
  }
}

export const fetchFoodnotes = () => {
  return dispatch => {
    dispatch(fetchFoodnotesStart());
    axios.get('/api/foodnotes/today')
    .then(response => {
      dispatch(fetchFoodnotesSuccess(response.data))
    })
    .catch(err => {
      if(err.response.status === 500){
        dispatch(fetchFoodnotesFail('Unable to load list. Please check your connection or try again later.'));
      } else {
        dispatch(fetchFoodnotesFail(err.response.data.errors));
      }
    })
  }
}