import axios from 'axios';
import { toast } from 'react-toastify';
import * as actionTypes from './actionTypes';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create Product Actions
export const createProductRequest = () => ({
  type: actionTypes.CREATE_PRODUCT_REQUEST
});

export const createProductSuccess = (product) => ({
  type: actionTypes.CREATE_PRODUCT_SUCCESS,
  payload: product
});

export const createProductFailure = (error) => ({
  type: actionTypes.CREATE_PRODUCT_FAILURE,
  payload: error
});

export const createProduct = (productData) => {
  return async (dispatch) => {
    dispatch(createProductRequest());
    try {
      const response = await axios.post(`${API_URL}/products`, productData);
      dispatch(createProductSuccess(response.data.data));
      toast.success(response.data.message || 'Product created successfully!');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create product';
      dispatch(createProductFailure(errorMessage));
      toast.error(errorMessage);
      throw error;
    }
  };
};

// Read Products Actions
export const readProductsRequest = () => ({
  type: actionTypes.READ_PRODUCTS_REQUEST
});

export const readProductsSuccess = (products) => ({
  type: actionTypes.READ_PRODUCTS_SUCCESS,
  payload: products
});

export const readProductsFailure = (error) => ({
  type: actionTypes.READ_PRODUCTS_FAILURE,
  payload: error
});

export const readProducts = () => {
  return async (dispatch) => {
    dispatch(readProductsRequest());
    try {
      const response = await axios.get(`${API_URL}/products`);
      dispatch(readProductsSuccess(response.data.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch products';
      dispatch(readProductsFailure(errorMessage));
      toast.error(errorMessage);
    }
  };
};

// Update Product Actions
export const updateProductRequest = () => ({
  type: actionTypes.UPDATE_PRODUCT_REQUEST
});

export const updateProductSuccess = (product) => ({
  type: actionTypes.UPDATE_PRODUCT_SUCCESS,
  payload: product
});

export const updateProductFailure = (error) => ({
  type: actionTypes.UPDATE_PRODUCT_FAILURE,
  payload: error
});

export const updateProduct = (id, productData) => {
  return async (dispatch) => {
    dispatch(updateProductRequest());
    try {
      const response = await axios.put(`${API_URL}/products/${id}`, productData);
      dispatch(updateProductSuccess(response.data.data));
      toast.success(response.data.message || 'Product updated successfully!');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update product';
      dispatch(updateProductFailure(errorMessage));
      toast.error(errorMessage);
      throw error;
    }
  };
};

// Delete Product Actions
export const deleteProductRequest = () => ({
  type: actionTypes.DELETE_PRODUCT_REQUEST
});

export const deleteProductSuccess = (productId) => ({
  type: actionTypes.DELETE_PRODUCT_SUCCESS,
  payload: productId
});

export const deleteProductFailure = (error) => ({
  type: actionTypes.DELETE_PRODUCT_FAILURE,
  payload: error
});

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(deleteProductRequest());
    try {
      const response = await axios.delete(`${API_URL}/products/${id}`);
      dispatch(deleteProductSuccess(id));
      toast.success(response.data.message || 'Product deleted successfully!');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete product';
      dispatch(deleteProductFailure(errorMessage));
      toast.error(errorMessage);
      throw error;
    }
  };
};

// UI Actions
export const clearError = () => ({
  type: actionTypes.CLEAR_ERROR
}); 