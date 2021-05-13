import axios from 'axios';
import {
    fetchCategories,
    fetchUsers,
    editProduct,
    editCategory,
    editUser,
} from '../../api';
import {
    fetchProductsSearch,
    showMessage,
} from '../actions';
import {
    IP_BACK,
    LOGIN, REGISTER,
    USERS, PRODUCTS, CATEGORIES
} from '../../configuration/routesConfig.config';

export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';

/* * * CATEGORIES * * */
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR';
export const GET_CATEGORIES_START = 'GET_CATEGORIES_START';
export const GET_CATEGORY_PAGE_CHANGE = 'GET CATEGORIES PAGE_CHANGE';
export const SET_CATEGORY_EDIT_ID = 'SET_CATEGORY_EDIT_ID';
export const SET_CATEGORY_EDIT_CHANGE = 'SET_CATEGORY_EDIT_CHANGE';
export const SET_CATEGORY_EDIT_SAVE = 'SET_CATEGORY_EDIT_SAVE';

/* * * PRODUCTS * * */
export const SET_PRODUCT_EDIT_ID = 'SET_PRODUCT_EDIT_ID';
export const SET_PRODUCT_EDIT_CHANGE = 'SET_PRODUCT_EDIT_CHANGE';
export const SET_PRODUCT_EDIT_SAVE = 'SET_PRODUCT_EDIT_SAVE';

export const EDIT_PRODUCT_SEARCH = 'EDIT_PRODUCT_SEARCH';
export const EDIT_PRODUCT_SEARCH_RESET = 'EDIT_PRODUCT_SEARCH_RESET';

/* * * USERS * * */
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_CHANGE_PAGE = 'GET_USERS_CHANGE_PAGE';
export const SET_USER_EDIT_ID = 'SET_USER_EDIT_ID';
export const SET_USER_EDIT_CHANGE = 'SET_USER_EDIT_CHANGE';
export const SET_USER_EDIT_SAVE = 'SET_USER_EDIT_SAVE';

export const userAuthSuccess = token => {
    return dispatch => {
        dispatch({
            type: USER_GET_SUCCESS,
            token,
        });
    }
};

/* * * CATEGORIES * * */

export const getCategoriesSuccess = result => {
    return dispatch => {
        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            result,
        });
    }
};

export const getCategoriesError = data => {
    return dispatch => {
        dispatch({
            type: GET_CATEGORIES_ERROR,
            data,
        });
        dispatch(showMessage({
            message: 'Error while fetching products!'
        }))
    }
};

export const getCategories = () => {
    return dispatch => {
        dispatch(fetchCategories());
    }
};

export const categoriesOnChangePage = page => {
    return dispatch => {
        dispatch({
            type: GET_CATEGORY_PAGE_CHANGE,
            page: page,
        })
        axios.get(IP_BACK + CATEGORIES + `?pageNumber=${page}`).then(({ data }) => {
            dispatch(getCategoriesSuccess(data))
        });
    }
}

/* * * PRODUCTS * * */
export const setProductEditId = id => {
    return (dispatch, getState) => {
        const data = getState().products.items.data;
        dispatch({
            type: SET_PRODUCT_EDIT_ID,
            data: data.find(e => e.id === id) || [],
        })
    }
}

export const editProductChange = (name, value) => {
    return dispatch => {
        dispatch({
            type: SET_PRODUCT_EDIT_CHANGE,
            name,
            value,
        });
    }
};

export const editProductOnSave = (type, callback = () => {}) => {
    return (dispatch, getState) => {
        const editFields = getState().admin.editProduct;
        const session = getState().admin.token;
        dispatch({
            type: SET_PRODUCT_EDIT_SAVE,
        });
        editProduct(type, editFields, session, callback);
    }
};

export const editProductSearch = (name, value) => {
    return dispatch => {
        dispatch({
            type: EDIT_PRODUCT_SEARCH,
            value,
            name,
        })
    }
}

/* * * CATEGORIES * * */

export const setCategoryEditId = id => {
    return (dispatch, getState) => {
        const data = getState().admin.categories;
        dispatch({
            type: SET_CATEGORY_EDIT_ID,
            data: data.find(e => e.id === id) || [],
        })
    }
};

export const editCategoryChange = (name, value) => {
    return dispatch => {
        dispatch({
            type: SET_CATEGORY_EDIT_CHANGE,
            name,
            value,
        });
    }
};

export const editCategoryOnSave = (type, callback = () => {}) => {
    return (dispatch, getState) => {
        const editFields = getState().admin.editCategory;
        const session = getState().admin.token;
        dispatch({
            type: SET_CATEGORY_EDIT_SAVE,
        });
        editCategory(type, editFields, session, callback);
    }
};

/* * * USERS * * */

export const getUsers = () => {
    return dispatch => {
        dispatch(fetchUsers());
    }
};

export const usersOnChangePage = page => {
    return dispatch => {
        dispatch({
            type: GET_USERS_CHANGE_PAGE,
            page: page,
        })
        axios.get(IP_BACK + CATEGORIES + `?pageNumber=${page}`).then(({ data }) => {
            dispatch(getUsersSuccess(data))
        });
    }
}

export const getUsersSuccess = data => {
    return dispatch => {
        dispatch({
            type: GET_USERS_SUCCESS,
            data,
        });
    };
};

export const setUserEditId = id => {
    return (dispatch, getState) => {
        const data = getState().admin.users.data;
        dispatch({
            type: SET_USER_EDIT_ID,
            data: data.find(e => e.id === id) || [],
        })
    }
};

export const editUserChange = (name, value) => {
    return dispatch => {
        dispatch({
            type: SET_USER_EDIT_CHANGE,
            name,
            value,
        });
    }
};

export const editUserOnSave = type => {
    return (dispatch, getState) => {
        const editFields = getState().admin.editUser;
        const session = getState().admin.token;
        dispatch({
            type: SET_USER_EDIT_SAVE,
        });
        editUser(type, editFields, session);
    }
};

/* * * FILTERS * * */

export const onProductSearch = () => {
    return (dispatch, getState) => {
        const { editProductsSearchType, editProductsSearchValue } = getState().filters;
        dispatch(fetchProductsSearch(editProductsSearchType, editProductsSearchValue));
    }
};

export const productsSearchReset = () => {
    return dispatch => {
        dispatch({
            type: EDIT_PRODUCT_SEARCH_RESET,
        })
    }
}