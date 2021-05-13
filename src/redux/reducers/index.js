import { combineReducers } from 'redux'

import filtersReducer from './filters'
import productsReducer from './products';
import userReducer from './userReducer';
import cart from './cart';
import admin from './admin';
import message from './message';

const rootReducer = combineReducers({
  filters: filtersReducer,
  products: productsReducer,
  user: userReducer,
  admin: admin,
  cart: cart,
  message: message,
});

export default rootReducer