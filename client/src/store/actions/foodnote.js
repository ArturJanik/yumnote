import {
  FETCH_FOODNOTES_START,
  FETCH_FOODNOTES_SUCCESS,
  FETCH_FOODNOTES_FAIL,
  UPDATE_FOODNOTE_START,
  UPDATE_FOODNOTE_SUCCESS,
  UPDATE_FOODNOTE_FAIL,
  DELETE_FOODNOTE_START,
  DELETE_FOODNOTE_SUCCESS,
  DELETE_FOODNOTE_FAIL
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


const updateFoodnoteStart = (id) => {
  return {
    type: UPDATE_FOODNOTE_START,
    id,
  }
}

const updateFoodnoteSuccess = (id, amount) => {
  return {
    type: UPDATE_FOODNOTE_SUCCESS,
    id,
    amount
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
    dispatch(updateFoodnoteStart(id));
    axios.put('/api/foodnotes/'+id, {amount})
    .then(response => {
      dispatch(updateFoodnoteSuccess(id, amount));
    })
    .catch(err => {
      console.error('Update foodnote error:', err.response.data.errors);
      dispatch(updateFoodnoteFail(err.response.data.errors));
    });
  }
}


export const deleteFoodnoteStart = (foodnoteId) => {
  return {
    type: DELETE_FOODNOTE_START,
    foodnoteId
  }
}

export const deleteFoodnoteSuccess = (deletedId) => {
  return {
    type: DELETE_FOODNOTE_SUCCESS,
    deletedId
  }
}

export const deleteFoodnoteFail = (error, foodnoteId) => {
  return {
    type: DELETE_FOODNOTE_FAIL,
    error,
    foodnoteId
  }
}

export const deleteFoodnote = (id) => {
  return dispatch => {
    dispatch(deleteFoodnoteStart(id));
    axios.delete('/api/foodnotes/'+id)
    .then(response => {
      dispatch(deleteFoodnoteSuccess(id));
    })
    .catch(err => {
      console.error('Delete foodnote error:', err);
      if(err.response.status === 500){
        dispatch(deleteFoodnoteFail('Unable to delete foodnote. Please check your connection or try again later.', id));
      } else {
        dispatch(deleteFoodnoteFail(err.response.data.errors, id));
      }
    })
  }
}