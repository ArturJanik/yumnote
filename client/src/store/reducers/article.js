import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  error: null,
  loading: false,
  articles: []
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ARTICLES_START: return fetchArticlesStart(state, action);
    case actionTypes.FETCH_ARTICLES_SUCCESS: return fetchArticlesSuccess(state, action);
    case actionTypes.FETCH_ARTICLES_FAIL: return fetchArticlesFail(state, action);

    default: return state;
  }
}

export default reducer;