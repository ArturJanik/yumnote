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

export const fetchArticleStart = () => {
  return {
    type: actionTypes.FETCH_ARTICLE_START
  }
}

export const fetchArticleSuccess = (article) => {
  return {
    type: actionTypes.FETCH_ARTICLE_SUCCESS,
    article
  }
}

export const fetchArticleFail = (error) => {
  return {
    type: actionTypes.FETCH_ARTICLE_FAIL,
    error
  }
}

export const fetchArticle = (id) => {
  return dispatch => {
    dispatch(fetchArticleStart());
    axios.get('/api/articles/'+id)
    .then(response => {
      console.log(response.data.article)
      dispatch(fetchArticleSuccess(response.data.article))
    })
    .catch(err => {
      console.error('Fetch promotions error:', err.response.data.errors);
      if(err.response.status === 500){
        dispatch(fetchArticleFail('Unable to load article. Please check your connection or try again later.'));
      } else {
        dispatch(fetchArticleFail(err.response.data.errors));
      }
    })
  }
}

