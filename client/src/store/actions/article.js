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
  }
}