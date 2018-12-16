import * as actionTypes from './actionTypes';
import axios from '../../shared/axios-global';

export const fetchArticlesStart = () => {
  return {
    type: actionTypes.FETCH_ARTICLES_START
  }
}

export const fetchArticlesSuccess = (articles) => {
  return {
    type: actionTypes.FETCH_ARTICLES_SUCCESS,
    articles
  }
}

export const fetchArticlesFail = (error) => {
  return {
    type: actionTypes.FETCH_ARTICLES_FAIL,
    error
  }
}

export const fetchArticles = () => {
  return dispatch => {
    dispatch(fetchArticlesStart());
    axios.get('/api/articles')
    .then(response => {
      console.log(response.data.articles)
      dispatch(fetchArticlesSuccess(response.data.articles))
    })
    .catch(err => {
      console.error('Fetch promotions error:', err.response.data.errors);
      if(err.response.status === 500){
        dispatch(fetchArticlesFail('Unable to load list. Please check your connection or try again later.'));
      } else {
        dispatch(fetchArticlesFail(err.response.data.errors));
      }
    })
  }
}

