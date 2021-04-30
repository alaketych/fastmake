import { 
  getProduct, 
  getProducts,
  getCategory,
  getCategories,
  getUsers,
  getUser,
} from '../../configuration/app'
import {
  IP_BACK,
  LOGIN, REGISTER,
  USERS, PRODUCTS, CATEGORIES
} from '../../configuration/routesConfig.config'
import axios from 'axios';

export const setLoaded = value => ({
  type: 'SET_LOADED',
  payload: value,
});

export const fetchCategories = (category, sortBy, pageNumber) => (dispatch, getState) => {
  dispatch(setLoaded(false))
  axios.get(IP_BACK + CATEGORIES +`?pageNumber=${pageNumber}`).then(({ data }) => {
      dispatch(setProducts(data))
  });
};

export const fetchCategory = (id) => dispatch => {
  dispatch(setLoaded(false))

  getCategory(id).then(({ data }) => {
      dispatch(setEditFields(data))
  });
};

export const onChangePage = (id) => dispatch => {
  dispatch(setLoaded(false))
  dispatch({
    type: 'PAGE_CHANGE',
    page: id,
  })

  axios.get(IP_BACK + CATEGORIES + `?pageNumber=${id}`).then(({ data }) => {
      dispatch(setProducts(data))
  });
};

export const setProducts = items => ({
  type: 'SET_PRODUCTS',
  payload: items,
})

export const setEditFields = editFields => ({
  type: 'SET_EDIT_FIELDS',
  editFields,
})