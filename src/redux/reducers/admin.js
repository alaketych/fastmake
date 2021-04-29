import {
    GET_CATEGORIES_START,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    SET_PRODUCT_EDIT_ID,
    SET_PRODUCT_EDIT_CHANGE,
    USER_GET_SUCCESS,
    GET_USERS_SUCCESS,
    SET_CATEGORY_EDIT_ID,
    SET_CATEGORY_EDIT_CHANGE,
    SET_USER_EDIT_ID,
    SET_USER_EDIT_CHANGE,
} from '../actions';

const initialState = {
    users: [],
    products: [],
    categories: [],
    isLoading: false,
    token: '',

    editProduct: {
        id: null,
        label: '',
        price: null,
        description: '',
        thumbnail: '',
    },
    editCategory: {
        id: null,
        label: '',
        thumbnail: '',
    },
    editUser: {
        firstName: '',
        lastName: '',
        id: null,
        phone: '',
        email: '',
        role: '',
    },

    catPageNumber: 0,
    catPageSize: 0,
    catPotalRecords: 0,
};
  
  const admin = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_START: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case GET_CATEGORIES_SUCCESS: {
            const result = action.result;
            return {
                ...state,
                isLoading: false,
                categories: result.data,
                catPageNumber: result.pageNumber,
                catPageSize: result.pageSize,
                catPotalRecords: result.totalRecords,
            }
        }
        case GET_CATEGORIES_ERROR: {
            return {
                ...initialState,
            }
        }
        case SET_PRODUCT_EDIT_ID: {
            return {
                ...state,
                editProduct: action.data.id === state.editProduct.id
                    ? initialState.editProduct
                    : action.data,
            }
        }
        case SET_PRODUCT_EDIT_CHANGE: {
            return {
                ...state,
                editProduct: {
                    ...state.editProduct,
                    [action.name]: action.value,
                }
            }
        }
        case USER_GET_SUCCESS: {
            return {
                ...state,
                token: action.token,
            }
        }
        case SET_CATEGORY_EDIT_ID: {
            return {
                ...state,
                editCategory: action.data.id === state.editCategory.id
                    ? initialState.editCategory
                    : action.data,
            }
        }
        case SET_CATEGORY_EDIT_CHANGE: {
            return {
                ...state,
                editCategory: {
                    ...state.editCategory,
                    [action.name]: action.value,
                }
            }
        }
        case SET_USER_EDIT_ID: {
            return {
                ...state,
                editUser: action.data.id === state.editUser.id
                    ? initialState.editCategory
                    : action.data,
            }
        }
        case SET_USER_EDIT_CHANGE: {
            return {
                ...state,
                editUser: {
                    ...state.editUser,
                    [action.name]: action.value,
                }
            }
        }
        case GET_USERS_SUCCESS: {
            return {
                ...state,
                users: action.data,
            }
        }
        default: {
            return state;
        }
}};
  
  export default admin;