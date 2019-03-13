import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_SUCCESS,
  FETCH_USER_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_FAIL,
  ADD_PRODUCT_START,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  UPDATE_PRODUCT_START,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_START,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CLEAR_PRODUCT_DATA,
  CLEAR_PRODUCT_ERROR,
  TOGGLE_PRODUCT_VISIBILITY_START,
  TOGGLE_PRODUCT_VISIBILITY_SUCCESS,
  TOGGLE_PRODUCT_VISIBILITY_FAIL,
  ADD_FOODNOTE_START,
  ADD_FOODNOTE_SUCCESS,
  ADD_FOODNOTE_FAIL,
  RESET_PRODUCT_REDUCER_STATE,
} from '../actions/actionTypes';
import { updateObject } from '../../utilities/utility';

const initialState = {
  error: null,
  loading: false,
  products: [],
  userProducts: [],
  product: null
}


const fetchProductsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

const fetchProductsSuccess = (state, action) => {
  const products = action.products.map(product => (
    {
      ...product,
      foodnoteCreationInProgress: false,
      error: null
    }
  ));
  return updateObject(state, {
    products,
    loading: false
  })
}

const fetchUserProductsSuccess = (state, action) => {
  const userProducts = action.products.map(product => (
    {
      ...product,
      deleteInProgress: false,
      error: null
    }
  ));
  return updateObject(state, {
    userProducts,
    loading: false
  })
}

const fetchProductsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const fetchProductStart = (state, action) => {
  return updateObject(state, { 
    product: null, 
    error: null, 
    loading: true 
  })
}

const fetchProductSuccess = (state, action) => {
  return updateObject(state, {
    product: action.product,
    loading: false 
  })
}

const fetchProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const addProductStart = (state, action) => {
  return updateObject(state, { 
    error: null, 
    loading: true 
  })
}

const addProductSuccess = (state, action) => {
  return updateObject(state, {
    loading: false 
  })
}

const addProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const updateProductStart = (state, action) => {
  return updateObject(state, { 
    error: null, 
    loading: true 
  })
}

const updateProductSuccess = (state, action) => {
  return updateObject(state, {
    loading: false 
  })
}

const updateProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


const addFoodnoteStart = (state, action) => {
  let updatedProducts = [ ...state.products ].map(prod => prod.id === action.productId ?
    { ...prod, foodnoteCreationInProgress: true, error: null } : prod);
  return updateObject(state, { products: updatedProducts })
}

const addFoodnoteSuccess = (state, action) => {
  let updatedProducts = [ ...state.products ].map(prod => prod.id === action.productId ?
    { ...prod, foodnoteCreationInProgress: false } : prod);
    
  return updateObject(state, { products: updatedProducts })
}

const addFoodnoteFail = (state, action) => {
  let updatedProducts = [ ...state.products ].map(prod => prod.id === action.productId ?
    { ...prod, foodnoteCreationInProgress: false, error: action.error } : prod);
  return updateObject(state, { products: updatedProducts })
}


const deleteProductStart = (state, action) => {
  let updatedProducts = [ ...state.userProducts ].map(prod => prod.id === action.productId ?
    { ...prod, deleteInProgress: true } : prod);
  return updateObject(state, { 
    error: null,
    userProducts: updatedProducts
  })
}

const deleteProductSuccess = (state, action) => {
  const filteredProducts = state.products.filter(product => product.id !== action.deletedId);
    
  return updateObject(state, {
    products: filteredProducts
  })
}

const deleteProductFail = (state, action) => {
  let updatedProducts = [ ...state.userProducts ].map(prod => prod.id === action.productId ?
    { ...prod, deleteInProgress: false } : prod);
  return updateObject(state, {
    error: action.error,
    userProducts: updatedProducts
  })
}

const clearProductData = (state, action) => {
  return updateObject(state, {
    product: null
  })
}

const clearProductError = (state, action) => {
  return updateObject(state, {
    error: null
  })
}

const toggleProductVisibilityStart = (state, action) => {
  return updateObject(state, {
    error: null
  })
}

const toggleProductVisibilitySuccess = (state, action) => {
  let updatedProducts = [ ...state.products ].map(prod => prod.id === action.id ?
    { ...prod, visible: !prod.visible } : prod);
  return updateObject(state, {
    error: null,
    products: updatedProducts
  })
}

const toggleProductVisibilityFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  })
}


const resetReducerState = (state, action) => {
  return { ...initialState }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_START: return fetchProductsStart(state, action);
    case FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess(state, action);
    case FETCH_USER_PRODUCTS_SUCCESS: return fetchUserProductsSuccess(state, action);
    case FETCH_PRODUCTS_FAIL: return fetchProductsFail(state, action);

    case FETCH_PRODUCT_START: return fetchProductStart(state, action);
    case FETCH_PRODUCT_SUCCESS: return fetchProductSuccess(state, action);
    case FETCH_PRODUCT_FAIL: return fetchProductFail(state, action);

    case ADD_PRODUCT_START: return addProductStart(state, action);
    case ADD_PRODUCT_SUCCESS: return addProductSuccess(state, action);
    case ADD_PRODUCT_FAIL: return addProductFail(state, action);

    case ADD_FOODNOTE_START: return addFoodnoteStart(state, action);
    case ADD_FOODNOTE_SUCCESS: return addFoodnoteSuccess(state, action);
    case ADD_FOODNOTE_FAIL: return addFoodnoteFail(state, action);

    case UPDATE_PRODUCT_START: return updateProductStart(state, action);
    case UPDATE_PRODUCT_SUCCESS: return updateProductSuccess(state, action);
    case UPDATE_PRODUCT_FAIL: return updateProductFail(state, action);

    case DELETE_PRODUCT_START: return deleteProductStart(state, action);
    case DELETE_PRODUCT_SUCCESS: return deleteProductSuccess(state, action);
    case DELETE_PRODUCT_FAIL: return deleteProductFail(state, action);

    case CLEAR_PRODUCT_DATA: return clearProductData(state, action);
    case CLEAR_PRODUCT_ERROR: return clearProductError(state, action);
    case RESET_PRODUCT_REDUCER_STATE: return resetReducerState(state, action);
    
    case TOGGLE_PRODUCT_VISIBILITY_START: return toggleProductVisibilityStart(state, action);
    case TOGGLE_PRODUCT_VISIBILITY_SUCCESS: return toggleProductVisibilitySuccess(state, action);
    case TOGGLE_PRODUCT_VISIBILITY_FAIL: return toggleProductVisibilityFail(state, action);

    default: return state;
  }
}

export default reducer;