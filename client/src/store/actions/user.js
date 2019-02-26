import * as moment from 'moment';
import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_STATISTICS_START,
  FETCH_STATISTICS_SUCCESS,
  FETCH_STATISTICS_FAIL,
  CLEAR_STATISTICS,
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