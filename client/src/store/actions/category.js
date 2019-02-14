import {
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL
} from './actionTypes';
import axios from '../../utilities/axios-global';

export const fetchCategoriesStart = () => {
  return {
    type: FETCH_CATEGORIES_START
  }
}

export const fetchCategoriesSuccess = (categories) => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    categories
  }
}

export const fetchCategoriesFail = (error) => {
  return {
    type: FETCH_CATEGORIES_FAIL,
    error
  }
}

export const fetchCategories = () => {
  return dispatch => {
    dispatch(fetchCategoriesStart());
    axios.get('/api/categories')
    .then(response => {
      dispatch(fetchCategoriesSuccess(response.data.categories))
    })
    .catch(err => {
      if(err.response.status === 500){
        dispatch(fetchCategoriesFail('Unable to load list. Please check your connection or try again later.'));
      } else {
        dispatch(fetchCategoriesFail(err.response.data.errors));
      }
    })
  }
}