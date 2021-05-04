import axios from 'axios';
import {
  getProduct
} from '../../configuration/app';
import {
  IP_BACK,
  LOGIN, REGISTER,
  USERS, PRODUCTS, CATEGORIES
} from '../../configuration/routesConfig.config'

export const setLoaded = value => ({
  type: 'SET_LOADED',
  payload: value,
});

export const fetchProducts = (category, sortBy, pageNumber) => (dispatch, getState) => {
  dispatch(setLoaded(false))
  axios.get(IP_BACK + PRODUCTS + `?${!sortBy ? '' : `sortBy=${sortBy}`}&${pageNumber ? `pageNumber=${pageNumber}`:''}`).then(({ data }) => {
      dispatch(setProducts(data))
  });
};

export const fetchCategoryProducts = (id, sortBy, pageNumber) => (dispatch, getState) => {
  dispatch(setLoaded(false))
  axios.get(IP_BACK + PRODUCTS + `category/${id}?${!sortBy ? '' : `sortBy=${sortBy}`}&${pageNumber ? `pageNumber=${pageNumber}`:''}`).then(({ data }) => {
      dispatch(setProducts(data))
  });
};

export const fetchProduct = (id) => dispatch => {
  dispatch(setLoaded(false))
  getProduct(id).then(({ data }) => {
      dispatch(setEditFields(data))
  });
};

export const fetchProductsSearch = (type, value) => {
  return dispatch => {
    if (type && value) {
      axios.get(IP_BACK + PRODUCTS + `?searchBy=${type}&searchValue=${value}`)
      .then(({data}) => {
        dispatch(setProducts(data))
      });
    } else {
      axios.get(IP_BACK + PRODUCTS)
      .then(({data}) => {
        dispatch(setProducts(data))
      });
    }
  };
}

export const onChangePage = (id, sortBy) => dispatch => {
  dispatch(setLoaded(false))
  dispatch({
    type: 'PAGE_CHANGE',
    page: id,
  })
  axios.get(IP_BACK + PRODUCTS + `?pageNumber=${id}&${!sortBy ? '' : `sortBy=${sortBy}`}`).then(({ data }) => {
      dispatch(setProducts(data))
  });
};

export const onChangeProductsCategoryPage = (id, catID, sortBy) => dispatch => {
  dispatch(setLoaded(false))
  dispatch({
    type: 'PAGE_CHANGE',
    page: id,
  })
  axios.get(IP_BACK + PRODUCTS + `category/${catID}?pageNumber=${id}&${!sortBy ? '' : `sortBy=${sortBy}`}`).then(({ data }) => {
      dispatch(setProducts(data))
  });
};

export const onChangeCategoryProductsPage = (id, sortBy) => dispatch => {
  dispatch(setLoaded(false))
  dispatch({
    type: 'PAGE_CHANGE',
    page: id,
  })
  axios.get(IP_BACK + PRODUCTS `category?pageNumber=${id}&${!sortBy ? '' : `sortBy=${sortBy}`}`).then(({ data }) => {
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