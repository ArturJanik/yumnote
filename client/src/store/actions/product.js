import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_SUCCESS,
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
  CLEAR_PRODUCT_SUCCESS
} from './actionTypes';
import axios from '../../utilities/axios-global';
import history from '../../utilities/history';

export const fetchProductsStart = () => {
  return {
    type: FETCH_PRODUCTS_START
  }
}

export const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products
  }
}

export const fetchProductsFail = (error) => {
  return {
    type: FETCH_PRODUCTS_FAIL,
    error
  }
}

export const fetchProducts = () => {
  return dispatch => {
    dispatch(fetchProductsStart());
    axios.get('/api/products')
    .then(response => {
      dispatch(fetchProductsSuccess(response.data.products))
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

export const fetchProductStart = () => {
  return {
    type: FETCH_PRODUCT_START
  }
}

export const fetchProductSuccess = (product) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    product
  }
}

export const fetchProductFail = (error) => {
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

export const addProductStart = () => {
  return {
    type: ADD_PRODUCT_START
  }
}

export const addProductSuccess = () => {
  return {
    type: ADD_PRODUCT_SUCCESS
  }
}

export const addProductFail = (error) => {
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
      dispatch(addProductSuccess());
      history.push('/');
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

export const updateProductStart = () => {
  return {
    type: UPDATE_PRODUCT_START
  }
}

export const updateProductSuccess = () => {
  return {
    type: UPDATE_PRODUCT_SUCCESS
  }
}

export const updateProductFail = (error) => {
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
      history.push('/');
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

export const deleteProductStart = (productId) => {
  return {
    type: DELETE_PRODUCT_START,
    productId
  }
}

export const deleteProductSuccess = (deletedId) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    deletedId
  }
}

export const deleteProductFail = (error, productId) => {
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

export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT_SUCCESS
  }
}