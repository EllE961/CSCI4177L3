import { createStore, applyMiddleware, compose } from 'redux';
import productReducer from './reducers';

// Redux Thunk middleware for async actions
const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

// Configure Redux DevTools Extension
const composeEnhancers = 
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Create store with middleware
const store = createStore(
  productReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store; 