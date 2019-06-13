import {
  FETCH_DOCUMENT_START,
  FETCH_DOCUMENT_SUCCESS,
  FETCH_DOCUMENT_FAIL,
  RESET_DOCUMENT_REDUCER_STATE
} from './actionTypes';
import axios from '../../utilities/axios-global';

const fetchDocumentStart = () => {
  return {
    type: FETCH_DOCUMENT_START
  }
}

const fetchDocumentSuccess = (document) => {
  return {
    type: FETCH_DOCUMENT_SUCCESS,
    document
  }
}

const fetchDocumentFail = (error) => {
  return {
    type: FETCH_DOCUMENT_FAIL,
    error
  }
}

export const fetchDocument = (slug) => {
  return dispatch => {
    dispatch(fetchDocumentStart());
    axios.get(`/api/documents/${slug}`)
    .then(response => {
      dispatch(fetchDocumentSuccess(response.data.document))
    })
    .catch(err => {
      if(err.response.status === 500){
        dispatch(fetchDocumentFail('Unable to load document. Please check your connection or try again later.'));
      } else {
        dispatch(fetchDocumentFail(err.response.data.errors));
      }
    })
  }
}

export const resetDocumentReducerState = () => {
  return {
    type: RESET_DOCUMENT_REDUCER_STATE
  }
}