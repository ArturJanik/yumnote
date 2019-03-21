import * as moment from 'moment';
import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_STATISTICS_START,
  FETCH_STATISTICS_SUCCESS,
  FETCH_STATISTICS_FAIL,
  CLEAR_STATISTICS,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_TIMEZONE_SUCCESS
} from './actionTypes';
import axios from '../../utilities/axios-global';
import history from '../../utilities/history';

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

const fetchStatisticsStart = () => {
  return {
    type: FETCH_STATISTICS_START
  }
}

const fetchStatisticsSuccess = (statsData) => {
  return {
    type: FETCH_STATISTICS_SUCCESS,
    stats: statsData
  }
}

const fetchStatisticsFail = (error) => {
  return {
    type: FETCH_STATISTICS_FAIL,
    error
  }
}

export const fetchStatistics = () => {
  return dispatch => {
    const statDate = localStorage.getItem('statisticsFetchDate');

    if(statDate === undefined || statDate < moment().dayOfYear()){
      dispatch(clearStatistics());
      dispatch(fetchStatisticsStart());
      axios.get('/api/foodnotes/statistics')
      .then(response => {
        const statisticsFetchDate = moment().dayOfYear();
        localStorage.setItem('statisticsFetchDate', statisticsFetchDate);
        localStorage.setItem('yearlyStatistics', JSON.stringify(response.data));
  
        dispatch(fetchStatisticsSuccess(response.data))
      })
      .catch(err => {
        if(err.response.status === 500){
          dispatch(fetchStatisticsFail('Unable to get statistics. Please check your connection or try again later.'));
        } else {
          dispatch(fetchStatisticsFail(err.response.data.errors));
        }
      })
    } else {
      dispatch(fetchStatisticsStart());
      const statistics = localStorage.getItem('yearlyStatistics');
      dispatch(fetchStatisticsSuccess(JSON.parse(statistics)));
    }
  }
}

export const clearStatistics = () => {
  return {
    type: CLEAR_STATISTICS
  }
}

const updateProfileStart = () => {
  return {
    type: UPDATE_PROFILE_START
  }
}

const updateProfileSuccess = () => {
  return {
    type: UPDATE_PROFILE_SUCCESS
  }
}

const updateTimezoneSuccess = (timezone) => {
  return {
    type: UPDATE_TIMEZONE_SUCCESS,
    timezone
  }
}

const updateProfileFail = (error) => {
  return {
    type: UPDATE_PROFILE_FAIL,
    error
  }
}

export const updateProfile = (formdata, id) => {
  return dispatch => {
    dispatch(updateProfileStart());
    axios.put('/api/users/'+id, formdata)
    .then(response => {
      dispatch(updateProfileSuccess());
      dispatch(updateTimezoneSuccess(response.data.timezone));
      history.push('/profile');
    })
    .catch(err => {
      console.error('Update profile error:', err.response.data.errors);
      if(err.response.status === 500){
        dispatch(updateProfileFail('Unable to update profile. Please check your connection or try again later.'));
      } else {
        dispatch(updateProfileFail(err.response.data.errors));
      }
    })
  }
}