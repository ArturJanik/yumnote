import {
  FETCH_FOODNOTES_START,
  FETCH_FOODNOTES_SUCCESS,
  FETCH_FOODNOTES_FAIL,
  ADD_FOODNOTE_START,
  ADD_FOODNOTE_SUCCESS,
  ADD_FOODNOTE_FAIL,
  UPDATE_FOODNOTE_START,
  UPDATE_FOODNOTE_SUCCESS,
  UPDATE_FOODNOTE_FAIL,
  DELETE_FOODNOTE_START,
  DELETE_FOODNOTE_SUCCESS,
  DELETE_FOODNOTE_FAIL
} from '../actions/actionTypes';
import { updateObject } from '../../utilities/utility';

const initialState = {
  error: null,
  loading: false,
  foodnotes: [],
  createInProgress: false,
  createdForProduct: null
}


const fetchFoodnotesStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

const fetchFoodnotesSuccess = (state, action) => {
  const foodnotes = action.foodnotes.map(note => (
    {
      ...note,
      updateInProgress: false,
      deleteInProgress: false
    }
  ));
  return updateObject(state, {
    foodnotes,
    error: null,
    loading: false
  })
}

const fetchFoodnotesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const addFoodnoteStart = (state, action) => {
  return updateObject(state, { 
    error: null,
    createInProgress: true,
    createdForProduct: action.productId
  })
}

const addFoodnoteSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    createInProgress: false,
    createdForProduct: null
  })
}

const addFoodnoteFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    creationInProgress: false,
    createdForProduct: null
  })
}


const updateFoodnoteStart = (state, action) => {
  const updatedFoodnotes = [ ...state.foodnotes ].map(note => note.id === action.id ?
    { ...note, updateInProgress: true } : note);
  return updateObject(state, {
    error: null,
    foodnotes: updatedFoodnotes
  })
}

const updateFoodnoteSuccess = (state, action) => {
  const updatedFoodnotes = [ ...state.foodnotes ].map(note => note.id === action.id ?
    { ...note, amount: action.amount, updateInProgress: false } : note);
  return updateObject(state, {
    error: null,
    loading: false,
    foodnotes: updatedFoodnotes
  })
}

const updateFoodnoteFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const deleteFoodnoteStart = (state, action) => {
  let updatedFoodnotes = [ ...state.foodnotes ].map(note => note.id === action.foodnoteId ?
    { ...note, deleteInProgress: true } : note);
  return updateObject(state, { 
    error: null,
    foodnotes: updatedFoodnotes
  })
}

const deleteFoodnoteSuccess = (state, action) => {
  const filteredFoodnotes = state.foodnotes.filter(foodnote => foodnote.id !== action.deletedId);
    
  return updateObject(state, {
    error: null,
    foodnotes: filteredFoodnotes
  })
}

const deleteFoodnoteFail = (state, action) => {
  let updatedFoodnotes = [ ...state.foodnotes ].map(note => note.id === action.foodnoteId ?
    { ...note, deleteInProgress: false } : note);
  return updateObject(state, {
    error: action.error,
    foodnotes: updatedFoodnotes
  })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FOODNOTES_START: return fetchFoodnotesStart(state, action);
    case FETCH_FOODNOTES_SUCCESS: return fetchFoodnotesSuccess(state, action);
    case FETCH_FOODNOTES_FAIL: return fetchFoodnotesFail(state, action);

    case ADD_FOODNOTE_START: return addFoodnoteStart(state, action);
    case ADD_FOODNOTE_SUCCESS: return addFoodnoteSuccess(state, action);
    case ADD_FOODNOTE_FAIL: return addFoodnoteFail(state, action);

    case UPDATE_FOODNOTE_START: return updateFoodnoteStart(state, action);
    case UPDATE_FOODNOTE_SUCCESS: return updateFoodnoteSuccess(state, action);
    case UPDATE_FOODNOTE_FAIL: return updateFoodnoteFail(state, action);

    case DELETE_FOODNOTE_START: return deleteFoodnoteStart(state, action);
    case DELETE_FOODNOTE_SUCCESS: return deleteFoodnoteSuccess(state, action);
    case DELETE_FOODNOTE_FAIL: return deleteFoodnoteFail(state, action);

    default: return state;
  }
}

export default reducer;