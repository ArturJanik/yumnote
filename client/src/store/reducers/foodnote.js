import {
  FETCH_FOODNOTES_START,
  FETCH_FOODNOTES_SUCCESS,
  FETCH_FOODNOTES_FAIL,
  UPDATE_FOODNOTE_START,
  UPDATE_FOODNOTE_SUCCESS,
  UPDATE_FOODNOTE_FAIL,
  DELETE_FOODNOTE_START,
  DELETE_FOODNOTE_SUCCESS,
  DELETE_FOODNOTE_FAIL,
  CLEAR_FOODNOTE_TOTALS,
  CLEAR_FOODNOTE_ERRORS,
  RESET_FOODNOTE_REDUCER_STATE
} from '../actions/actionTypes';
import { updateObject } from '../../utilities/utility';

const initialState = {
  error: null,
  loading: false,
  foodnotes: [],
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


const clearFoodnoteTotals = (state, action) => {
  return updateObject(state, { totals: initialState.totals })
}

const clearFoodnoteErrors = (state, action) => {
  return updateObject(state, { error: null })
}

const resetReducerState = (state, action) => {
  return { ...initialState }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FOODNOTES_START: return fetchFoodnotesStart(state, action);
    case FETCH_FOODNOTES_SUCCESS: return fetchFoodnotesSuccess(state, action);
    case FETCH_FOODNOTES_FAIL: return fetchFoodnotesFail(state, action);

    case UPDATE_FOODNOTE_START: return updateFoodnoteStart(state, action);
    case UPDATE_FOODNOTE_SUCCESS: return updateFoodnoteSuccess(state, action);
    case UPDATE_FOODNOTE_FAIL: return updateFoodnoteFail(state, action);

    case DELETE_FOODNOTE_START: return deleteFoodnoteStart(state, action);
    case DELETE_FOODNOTE_SUCCESS: return deleteFoodnoteSuccess(state, action);
    case DELETE_FOODNOTE_FAIL: return deleteFoodnoteFail(state, action);

    case CLEAR_FOODNOTE_TOTALS: return clearFoodnoteTotals(state, action);
    case CLEAR_FOODNOTE_ERRORS: return clearFoodnoteErrors(state, action);
    case RESET_FOODNOTE_REDUCER_STATE: return resetReducerState(state, action);

    default: return state;
  }
}

export default reducer;