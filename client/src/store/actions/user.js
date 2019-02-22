import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL
} from './actionTypes';
import axios from '../../utilities/axios-global';

const fetchProfileStart = () => {
  return {
    type: FETCH_PROFILE_START
  }
}

const fetchProfileSuccess = (profile) => {
  return {
    type: FETCH_PROFILE_SUCCESS,
    profile
  }
}

const fetchProfileFail = (error) => {
  return {
    type: FETCH_PROFILE_FAIL,
    error
  }
}

export const fetchProfile = () => {
  return dispatch => {
    dispatch(fetchProfileStart());
    axios.get('/api/profile')
    .then(response => {
      dispatch(fetchProfileSuccess(response.data.user))
    })
    .catch(err => {
      if(err.response.status === 500){
        dispatch(fetchProfileFail('Unable to load profile. Please check your connection or try again later.'));
      } else {
        dispatch(fetchProfileFail(err.response.data.errors));
      }
    })
  }
}