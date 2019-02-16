import {
  FETCH_FOODNOTES_START,
  FETCH_FOODNOTES_SUCCESS,
  FETCH_FOODNOTES_FAIL,
  UPDATE_FOODNOTE_START,
  UPDATE_FOODNOTE_SUCCESS,
  UPDATE_FOODNOTE_FAIL,
} from './actionTypes';
import axios from '../../utilities/axios-global';

const fetchFoodnotesStart = () => {
  return {
    type: FETCH_FOODNOTES_START
  }
}

const fetchFoodnotesSuccess = (foodnotes) => {
  return {
    type: FETCH_FOODNOTES_SUCCESS,
    foodnotes
  }
}

const fetchFoodnotesFail = (error) => {
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

const updateFoodnoteStart = () => {
  return {
    type: UPDATE_FOODNOTE_START
  }
}

const updateFoodnoteSuccess = () => {
  return {
    type: UPDATE_FOODNOTE_SUCCESS
  }
}

const updateFoodnoteFail = (error) => {
  return {
    type: UPDATE_FOODNOTE_FAIL,
    error
  }
}

export const updateFoodnote = (id, amount) => {
  return dispatch => {
    dispatch(updateFoodnoteStart());
    axios.put('/api/foodnotes/'+id, {amount})
    .then(response => {
      dispatch(updateFoodnoteSuccess());
    })
    .catch(err => {
      console.error('Update foodnote error:', err.response.data.errors);
      dispatch(updateFoodnoteFail(err.response.data.errors));
    });
  }
}