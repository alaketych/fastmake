import { combineReducers } from 'redux'

import filtersReducer from './filters'
import productsReducer from './products';
import userReducer from './userReducer';
import admin from './admin';

const rootReducer = combineReducers({
  filters: filtersReducer,
  products: productsReducer,
  user: userReducer,
  admin,

});

export default rootReducer