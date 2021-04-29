import axios from 'axios';
import { 
  getProducts,
} from '../../configuration/app';

export const setLoaded = value => ({
  type: 'SET_LOADED',
  payload: value,
});

export const fetchProducts = (category, sortBy, pageNumber) => (dispatch, getState) => {
  dispatch(setLoaded(false))
  axios.get(`https://localhost:5001/products?${!sortBy ? '' : `sortBy=${sortBy}`}&${pageNumber ? `pageNumber=${pageNumber}`:''}`).then(({ data }) => {
      dispatch(setProducts(data))
  });
};

export const fetchProduct = (id) => dispatch => {
  dispatch(setLoaded(false))
  getProducts(id).then(({ data }) => {
      dispatch(setEditFields(data))
  });
};

export const onChangePage = (id, sortBy) => dispatch => {
  dispatch(setLoaded(false))
  dispatch({
    type: 'PAGE_CHANGE',
    page: id,
  })
  axios.get(`https://localhost:5001/products?pageNumber=${id}&${!sortBy ? '' : `sortBy=${sortBy}`}`).then(({ data }) => {
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