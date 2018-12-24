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
      console.error('Fetch articles error:', err.response.data.errors);
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
    type: actionTypes.ADD_ARTICLE_START
  }
}

export const addArticleSuccess = () => {
  return {
    type: actionTypes.ADD_ARTICLE_SUCCESS
  }
}

export const addArticleFail = (error) => {
  return {
    type: actionTypes.ADD_ARTICLE_FAIL,
    error
  }
}

export const addArticle = (formdata) => {
  return dispatch => {
    dispatch(addArticleStart());
    axios.post('/api/articles', formdata)
    .then(response => {
      console.log(response)
      dispatch(addArticleSuccess())
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
    type: actionTypes.UPDATE_ARTICLE_START
  }
}

export const updateArticleSuccess = () => {
  return {
    type: actionTypes.UPDATE_ARTICLE_SUCCESS
  }
}

export const updateArticleFail = (error) => {
  return {
    type: actionTypes.UPDATE_ARTICLE_FAIL,
    error
  }
}

export const updateArticle = (formdata, id) => {
  return dispatch => {
    dispatch(updateArticleStart());
    axios.put('/api/articles/'+id, formdata)
    .then(response => {
      console.log(response)
      dispatch(updateArticleSuccess());
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

export const deleteArticleStart = () => {
  return {
    type: actionTypes.DELETE_ARTICLE_START
  }
}

export const deleteArticleSuccess = (deletedId) => {
  return {
    type: actionTypes.DELETE_ARTICLE_SUCCESS,
    deletedId
  }
}

export const deleteArticleFail = (error) => {
  return {
    type: actionTypes.DELETE_ARTICLE_FAIL,
    error
  }
}

export const deleteArticle = (id) => {
  return dispatch => {
    dispatch(deleteArticleStart());
    axios.delete('/api/articles/'+id)
    .then(response => {
      console.log(response)
      dispatch(deleteArticleSuccess(id));
    })
    .catch(err => {
      console.error('Delete article error:', err.response.data.errors);
      if(err.response.status === 500){
        dispatch(deleteArticleFail('Unable to delete article. Please check your connection or try again later.'));
      } else {
        dispatch(deleteArticleFail(err.response.data.errors));
      }
    })
  }
}