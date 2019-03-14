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
  RESET_PRODUCT_REDUCER_STATE
} from './actionTypes';
import axios from '../../utilities/axios-global';
import history from '../../utilities/history';

const fetchProductsStart = () => {
  return {
    type: FETCH_PRODUCTS_START
  }
}

const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products
  }
}

const fetchUserProductsSuccess = (products) => {
  return {
    type: FETCH_USER_PRODUCTS_SUCCESS,
    products
  }
}

const fetchProductsFail = (error) => {
  return {
    type: FETCH_PRODUCTS_FAIL,
    error
  }
}

const fetchProducts = (settings) => {
  return dispatch => {
    dispatch(fetchProductsStart());
    axios.get(settings.url)
    .then(response => {
      if(settings.currentUser){
        dispatch(fetchUserProductsSuccess(response.data.products))
      } else {
        dispatch(fetchProductsSuccess(response.data.products))
      }
    })
    .catch(err => {
      if(err.response.status === 500){
        dispatch(fetchProductsFail('Unable to load list. Please check your connection or try again later.'));
      } else {
        dispatch(fetchProductsFail(err.response.data.errors));
      }
    })
  }
}

export const fetchCategoryProducts = (category_id) => {
  return dispatch => {
    dispatch(fetchProducts({
      url: `/api/categories/${category_id}/products`
    }))
  }
}
export const fetchCurrentUserProducts = () => {
  console.log('Fetching current user products...')
  return dispatch => {
    dispatch(fetchProducts({
      currentUser: true,
      url: '/api/products/currentuser'
    }))
  }
}
export const fetchLatestProducts = () => {
  return dispatch => {
    dispatch(fetchProducts({
      url: '/api/products/latest'
    }))
  }
}

const fetchProductStart = () => {
  return {
    type: FETCH_PRODUCT_START
  }
}

const fetchProductSuccess = (product) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    product
  }
}

const fetchProductFail = (error) => {
  return {
    type: FETCH_PRODUCT_FAIL,
    error
  }
}

export const fetchProduct = (id) => {
  return dispatch => {
    dispatch(fetchProductStart());
    axios.get('/api/products/'+id)
    .then(response => {
      dispatch(fetchProductSuccess(response.data.product))
    })
    .catch(err => {
      console.error('Fetch product error:', err.response.data.errors);
      if(err.response.status === 500){
        dispatch(fetchProductFail('Unable to load product. Please check your connection or try again later.'));
      } else {
        dispatch(fetchProductFail(err.response.data.errors));
      }
    })
  }
}

const addProductStart = () => {
  return {
    type: ADD_PRODUCT_START
  }
}

const addProductSuccess = (product) => {
  return {
    type: ADD_PRODUCT_SUCCESS,
    product
  }
}

const addProductFail = (error) => {
  return {
    type: ADD_PRODUCT_FAIL,
    error
  }
}

export const addProduct = (formdata) => {
  return dispatch => {
    dispatch(addProductStart());
    axios.post('/api/products', formdata)
    .then(response => {
      dispatch(addProductSuccess(response.data.product));
      history.push('/products');
    })
    .catch(err => {
      console.error('Create product error:', err.response.data.errors);
      if(err.response.status === 500){
        dispatch(addProductFail('Unable to create new product. Please check your connection or try again later.'));
      } else {
        dispatch(addProductFail(err.response.data.errors));
      }
    })
  }
}

const updateProductStart = () => {
  return {
    type: UPDATE_PRODUCT_START
  }
}

const updateProductSuccess = () => {
  return {
    type: UPDATE_PRODUCT_SUCCESS
  }
}

const updateProductFail = (error) => {
  return {
    type: UPDATE_PRODUCT_FAIL,
    error
  }
}

export const updateProduct = (formdata, id) => {
  return dispatch => {
    dispatch(updateProductStart());
    axios.put('/api/products/'+id, formdata)
    .then(response => {
      dispatch(updateProductSuccess());
      history.push('/products');
    })
    .catch(err => {
      console.error('Update product error:', err.response.data.errors);
      if(err.response.status === 500){
        dispatch(updateProductFail('Unable to update product. Please check your connection or try again later.'));
      } else {
        dispatch(updateProductFail(err.response.data.errors));
      }
    })
  }
}

const deleteProductStart = (productId) => {
  return {
    type: DELETE_PRODUCT_START,
    productId
  }
}

const deleteProductSuccess = (deletedId) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    deletedId
  }
}

const deleteProductFail = (error, productId) => {
  return {
    type: DELETE_PRODUCT_FAIL,
    error,
    productId
  }
}

export const deleteProduct = (id) => {
  return dispatch => {
    dispatch(deleteProductStart(id));
    axios.delete('/api/products/'+id)
    .then(response => {
      dispatch(deleteProductSuccess(id));
    })
    .catch(err => {
      console.error('Delete product error:', err.response.data.errors);
      if(err.response.status === 500){
        dispatch(deleteProductFail('Unable to delete product. Please check your connection or try again later.', id));
      } else {
        dispatch(deleteProductFail(err.response.data.errors, id));
      }
    })
  }
}

const toggleVisibilityStart = () => {
  return {
    type: TOGGLE_PRODUCT_VISIBILITY_START
  }
}

const toggleVisibilitySuccess = (id) => {
  return {
    type: TOGGLE_PRODUCT_VISIBILITY_SUCCESS,
    id
  }
}

const toggleVisibilityFail = (error) => {
  return {
    type: TOGGLE_PRODUCT_VISIBILITY_FAIL,
    error
  }
}

export const toggleProductVisibility = (id) => {
  return dispatch => {
    dispatch(toggleVisibilityStart());
    axios.patch(`/api/products/${id}/toggle_visibility`)
    .then(response => {
      dispatch(toggleVisibilitySuccess(id));
    })
    .catch(err => {
      console.error('Toggle product visibility error:', err.response.data.errors);
      if(err.response.status === 500){
        dispatch(toggleVisibilityFail('Unable to proceed. Please check your connection or try again later.'));
      } else {
        dispatch(toggleVisibilityFail(err.response.data.errors));
      }
    })
  }
}

export const clearProductData = () => {
  return {
    type: CLEAR_PRODUCT_DATA
  }
}

export const clearProductError = () => {
  return {
    type: CLEAR_PRODUCT_ERROR,
  }
}

export const resetProductReducerState = () => {
  return {
    type: RESET_PRODUCT_REDUCER_STATE,
  }
}