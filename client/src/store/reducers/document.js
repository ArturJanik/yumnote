import {
  FETCH_DOCUMENT_START,
  FETCH_DOCUMENT_SUCCESS,
  FETCH_DOCUMENT_FAIL,
  CLEAR_DOCUMENT
} from '../actions/actionTypes';
import { updateObject } from '../../utilities/utility';

const initialState = {
  error: null,
  loading: false,
  document: null
}


const fetchDocumentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    document: null
  })
}

const fetchDocumentSuccess = (state, action) => {
  return updateObject(state, {
    document: action.document,
    error: null,
    loading: false
  })
}

const fetchDocumentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const clearDocument = (state, action) => {
  return updateObject(state, initialState)
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCUMENT_START: return fetchDocumentStart(state, action);
    case FETCH_DOCUMENT_SUCCESS: return fetchDocumentSuccess(state, action);
    case FETCH_DOCUMENT_FAIL: return fetchDocumentFail(state, action);

    case CLEAR_DOCUMENT: return clearDocument(state, action);

    default: return state;
  }
}

export default reducer;