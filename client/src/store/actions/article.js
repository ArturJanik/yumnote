import {
  FETCH_ARTICLES_START,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAIL,
  FETCH_ARTICLE_START,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAIL,
  ADD_ARTICLE_START,
  ADD_ARTICLE_SUCCESS,
  ADD_ARTICLE_FAIL,
  UPDATE_ARTICLE_START,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAIL,
  DELETE_ARTICLE_START,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAIL,
  CLEAR_ARTICLE_SUCCESS
} from './actionTypes';
import axios from '../../shared/axios-global';
import history from '../../shared/history';

export const fetchArticlesStart = () => {
  return {
    type: FETCH_ARTICLES_START
  }
}

export const fetchArticlesSuccess = (articles) => {
  return {
    type: FETCH_ARTICLES_SUCCESS,
    articles
  }
}

export const fetchArticlesFail = (error) => {
  return {
    type: FETCH_ARTICLES_FAIL,
    error
  }
}

export const fetchArticles = () => {
  return dispatch => {
    dispatch(fetchArticlesStart());
    axios.get('/api/articles')
    .then(response => {
      dispatch(fetchArticlesSuccess(response.data.articles))
    })
    .catch(err => {
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
    type: FETCH_ARTICLE_START
  }
}

export const fetchArticleSuccess = (article) => {
  return {
    type: FETCH_ARTICLE_SUCCESS,
    article
  }
}

export const fetchArticleFail = (error) => {
  return {
    type: FETCH_ARTICLE_FAIL,
    error
  }
}

export const fetchArticle = (id) => {
  return dispatch => {
    dispatch(fetchArticleStart());
    axios.get('/api/articles/'+id)
    .then(response => {
      dispatch(fetchArticleSuccess(response.data.article))
    })
    .catch(err => {
      console.error('Fetch article error:', err.response.data.errors);
      if(err.response.status === 500){
        dispatch(fetchArticleFail('Unable to load article. Please check your connection or try again later.'));
      } else {
        dispatch(fetchArticleFail(err.response.data.errors));
      }
    })
  }
}

export const addArticleStart = () => {
  return {
    type: ADD_ARTICLE_START
  }
}

export const addArticleSuccess = () => {
  return {
    type: ADD_ARTICLE_SUCCESS
  }
}

export const addArticleFail = (error) => {
  return {
    type: ADD_ARTICLE_FAIL,
    error
  }
}

export const addArticle = (formdata) => {
  return dispatch => {
    dispatch(addArticleStart());
    axios.post('/api/articles', formdata)
    .then(response => {
      dispatch(addArticleSuccess());
      history.push('/');
    })
    .catch(err => {
      console.error('Create article error:', err.response.data.errors);
      if(err.response.status === 500){
        dispatch(addArticleFail('Unable to create new article. Please check your connection or try again later.'));
      } else {
        dispatch(addArticleFail(err.response.data.errors));
      }
    })
  }
}

export const updateArticleStart = () => {
  return {
    type: UPDATE_ARTICLE_START
  }
}

export const updateArticleSuccess = () => {
  return {
    type: UPDATE_ARTICLE_SUCCESS
  }
}

export const updateArticleFail = (error) => {
  return {
    type: UPDATE_ARTICLE_FAIL,
    error
  }
}

export const updateArticle = (formdata, id) => {
  return dispatch => {
    dispatch(updateArticleStart());
    axios.put('/api/articles/'+id, formdata)
    .then(response => {
      dispatch(updateArticleSuccess());
      history.push('/');
    })
    .catch(err => {
      console.error('Update article error:', err.response.data.errors);
      if(err.response.status === 500){
        dispatch(updateArticleFail('Unable to update article. Please check your connection or try again later.'));
      } else {
        dispatch(updateArticleFail(err.response.data.errors));
      }
    })
  }
}

export const deleteArticleStart = (articleId) => {
  return {
    type: DELETE_ARTICLE_START,
    articleId
  }
}

export const deleteArticleSuccess = (deletedId) => {
  return {
    type: DELETE_ARTICLE_SUCCESS,
    deletedId
  }
}

export const deleteArticleFail = (error, articleId) => {
  return {
    type: DELETE_ARTICLE_FAIL,
    error,
    articleId
  }
}

export const deleteArticle = (id) => {
  return dispatch => {
    dispatch(deleteArticleStart(id));
    axios.delete('/api/articles/'+id)
    .then(response => {
      dispatch(deleteArticleSuccess(id));
    })
    .catch(err => {
      console.error('Delete article error:', err.response.data.errors);
      if(err.response.status === 500){
        dispatch(deleteArticleFail('Unable to delete article. Please check your connection or try again later.', id));
      } else {
        dispatch(deleteArticleFail(err.response.data.errors, id));
      }
    })
  }
}

export const clearArticle = () => {
  return {
    type: CLEAR_ARTICLE_SUCCESS
  }
}