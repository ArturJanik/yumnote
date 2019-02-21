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
  createdForProduct: null,
  totals: {
    kcal: 0,
    carb: 0,
    fat: 0,
    prot: 0
  }
}


const fetchFoodnotesStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    totals: {
      kcal: 0,
      carb: 0,
      fat: 0,
      prot: 0
    }
  })
}

const calculateTotals = (foodnotes) => {
  let totals = {
    kcal: 0,
    carb: 0,
    fat: 0,
    prot: 0
  }

  foodnotes.forEach(note => {
    totals.kcal += note.amount * note.product.kcal
    totals.carb += note.amount * note.product.carb
    totals.fat += note.amount * note.product.fat
    totals.prot += note.amount * note.product.prot
  });

  return totals;
}

const fetchFoodnotesSuccess = (state, action) => {
  const foodnotes = action.foodnotes.map(note => (
    {
      ...note,
      updateInProgress: false,
      deleteInProgress: false
    }
  ));

  const totals = calculateTotals(foodnotes);

  return updateObject(state, {
    foodnotes,
    error: null,
    loading: false,
    totals
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

  const totals = calculateTotals(updatedFoodnotes);

  return updateObject(state, {
    error: null,
    loading: false,
    foodnotes: updatedFoodnotes,
    totals
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

  const totals = calculateTotals(filteredFoodnotes);
    
  return updateObject(state, {
    error: null,
    foodnotes: filteredFoodnotes,
    totals
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