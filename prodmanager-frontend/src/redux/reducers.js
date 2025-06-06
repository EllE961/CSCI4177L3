import * as actionTypes from './actionTypes';

const initialState = {
  products: [],
  loading: false,
  error: null,
  isCreating: false,
  isUpdating: false,
  isDeleting: false
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Product Cases
    case actionTypes.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        isCreating: true,
        error: null
      };
    
    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isCreating: false,
        products: [...state.products, action.payload],
        error: null
      };
    
    case actionTypes.CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        isCreating: false,
        error: action.payload
      };

    // Read Products Cases
    case actionTypes.READ_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case actionTypes.READ_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null
      };
    
    case actionTypes.READ_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Update Product Cases
    case actionTypes.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isUpdating: true,
        error: null
      };
    
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
        error: null
      };
    
    case actionTypes.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.payload
      };

    // Delete Product Cases
    case actionTypes.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        isDeleting: true,
        error: null
      };
    
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        products: state.products.filter(product => product.id !== action.payload),
        error: null
      };
    
    case actionTypes.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.payload
      };

    // UI Cases
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

export default productReducer; 