import {
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL
} from '../actions/actionTypes';
import { updateObject } from '../../utilities/utility';

const initialState = {
  error: null,
  loading: false,
  categories: []
}


const fetchCategoriesStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

const fetchCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    categories: action.categories,
    error: null,
    loading: false
  })
}

const fetchCategoriesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_START: return fetchCategoriesStart(state, action);
    case FETCH_CATEGORIES_SUCCESS: return fetchCategoriesSuccess(state, action);
    case FETCH_CATEGORIES_FAIL: return fetchCategoriesFail(state, action);

    default: return state;
  }
}

export default reducer;