import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  error: null,
  loading: false,
  articles: [],
  article: null
}


const fetchArticlesStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

const fetchArticlesSuccess = (state, action) => {
  const articles = action.articles.map(article => (
    {
      ...article
    }
  ));
  return updateObject(state, {
    articles,
    error: null,
    loading: false
  })
}

const fetchArticlesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const fetchArticleStart = (state, action) => {
  return updateObject(state, { 
    article: null, 
    error: null, 
    loading: true 
  })
}

const fetchArticleSuccess = (state, action) => {
  return updateObject(state, {
    article: action.article,
    error: null, 
    loading: false 
  })
}

const fetchArticleFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const addArticleStart = (state, action) => {
  return updateObject(state, { 
    error: null, 
    loading: true 
  })
}

const addArticleSuccess = (state, action) => {
  return updateObject(state, {
    error: null, 
    loading: false 
  })
}

const addArticleFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const updateArticleStart = (state, action) => {
  return updateObject(state, { 
    error: null, 
    loading: true 
  })
}

const updateArticleSuccess = (state, action) => {
  return updateObject(state, {
    error: null, 
    loading: false 
  })
}

const updateArticleFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const deleteArticleStart = (state, action) => {
  return updateObject(state, { 
    error: null
  })
}

const deleteArticleSuccess = (state, action) => {
  const filteredArticles = state.articles.filter(article => article.id !== action.deletedId);
    
  return updateObject(state, {
    error: null,
    articles: filteredArticles
  })
}

const deleteArticleFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ARTICLES_START: return fetchArticlesStart(state, action);
    case actionTypes.FETCH_ARTICLES_SUCCESS: return fetchArticlesSuccess(state, action);
    case actionTypes.FETCH_ARTICLES_FAIL: return fetchArticlesFail(state, action);

    case actionTypes.FETCH_ARTICLE_START: return fetchArticleStart(state, action);
    case actionTypes.FETCH_ARTICLE_SUCCESS: return fetchArticleSuccess(state, action);
    case actionTypes.FETCH_ARTICLE_FAIL: return fetchArticleFail(state, action);

    case actionTypes.ADD_ARTICLE_START: return addArticleStart(state, action);
    case actionTypes.ADD_ARTICLE_SUCCESS: return addArticleSuccess(state, action);
    case actionTypes.ADD_ARTICLE_FAIL: return addArticleFail(state, action);

    case actionTypes.UPDATE_ARTICLE_START: return updateArticleStart(state, action);
    case actionTypes.UPDATE_ARTICLE_SUCCESS: return updateArticleSuccess(state, action);
    case actionTypes.UPDATE_ARTICLE_FAIL: return updateArticleFail(state, action);

    case actionTypes.DELETE_ARTICLE_START: return deleteArticleStart(state, action);
    case actionTypes.DELETE_ARTICLE_SUCCESS: return deleteArticleSuccess(state, action);
    case actionTypes.DELETE_ARTICLE_FAIL: return deleteArticleFail(state, action);

    default: return state;
  }
}

export default reducer;