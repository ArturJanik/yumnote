import {
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  RESET_CATEGORY_REDUCER_STATE
} from './actionTypes';
import axios from '../../utilities/axios-global';

const fetchCategoriesStart = () => {
  return {
    type: FETCH_CATEGORIES_START
  }
}

const fetchCategoriesSuccess = (categories) => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    categories
  }
}

const fetchCategoriesFail = (error) => {
  return {
    type: FETCH_CATEGORIES_FAIL,
    error
  }
}

export const fetchCategories = () => {
  let url = '/api/categories';
  return dispatch => {
    dispatch(fetchCategoriesStart());
    axios.get(url)
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

export const resetCategoryReducerState = () => {
  return {
    type: RESET_CATEGORY_REDUCER_STATE,
  }
}