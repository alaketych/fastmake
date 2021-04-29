import { getCategoriesSuccess, getCategoriesError, getUsersSuccess } from '../redux/actions';
import {
    IP_BACK,
    CATEGORIES,
    USERS,
    PRODUCTS,
} from '../configuration';

export const fetchCategories = () => {
    
    return dispatch => {
        fetch(IP_BACK + CATEGORIES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(data => data.json())
            .then(data => {
                dispatch(getCategoriesSuccess(data));
            })
            .catch(err => getCategoriesError())
    }
};

export const fetchUsers = () => {
    
    return (dispatch, getState) => {
        const session = getState().admin.token;
        fetch(IP_BACK + USERS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session,
            },
            })
            .then(data => data.json())
            .then(data => {
                dispatch(getUsersSuccess(data));
            })
    };
}
export const editProduct = (type, editedProduct, session = '', callback) => {
    switch(type) {
        case 'update': {
            fetch(IP_BACK +  PRODUCTS + `${editedProduct.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session,
            },
            body: JSON.stringify(editedProduct),
            })
            .then(data => data.json())
            .then(data => {
                return dispatch => {
                    if (callback) {
                        dispatch(callback());
                    }
                }
            })
            .catch(err => console.log('Error while updating user', err));
            break;
        }
        case 'create': {
            fetch(IP_BACK + PRODUCTS, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session,
            },
            body: JSON.stringify({
                'Id':editedProduct.id,
                'Description':editedProduct.description,
                'Price':editedProduct.price,
                'Label':editedProduct.label,
                'Thumbnail':editedProduct.thumbnail,
            }),
            })
            .then(data => data.json())
            .then(data => {
                return dispatch => {
                    if (callback) {
                        dispatch(callback());
                    }
                }
            })
            .catch(err => console.log('Error while adding user', err));
            break;
        }
        case 'remove': {
            fetch(IP_BACK +  PRODUCTS + `${editedProduct.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + session,
                },
            })
            .then(data => data.json())
            .then(data => {
                return dispatch => {
                    if (callback) {
                        dispatch(callback());
                    }
                }
            })
            .catch(err => console.log('Error while removing user', err));
            break;
        }
        default: {
            return;
        }
    }
};

export const editCategory = (type, editedCategory, session = '', callback) => {
    switch(type) {
        case 'update': {
            fetch(IP_BACK + CATEGORIES + `${editedCategory.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session,
            },
            body: JSON.stringify(editedCategory),
            })
            .then(data => data.json())
            .then(data => {
                return dispatch => {
                    if (callback) {
                        dispatch(callback());
                    }
                }
            })
            .catch(err => console.log('Error while editing user', err));
            break;
        }
        case 'create': {
            const creatableData = {
                label: editedCategory.label,
                price: editedCategory.price,
                description: editedCategory.description,
                thumbnail: editedCategory.thumbnail,
            }
            fetch(IP_BACK + CATEGORIES, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + session,
                },
                body: JSON.stringify(creatableData),
            })
            .then(data => data.json())
            .then(data => {
                return dispatch => {
                    if (callback) {
                        dispatch(callback());
                    }
                }
            })
            .catch(err => console.log('Error while adding user', err));
            break;
        }
        case 'remove': {
            fetch(IP_BACK + CATEGORIES + `${editedCategory.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session,
            },
            })
            .then(data => data.json())
            .then(data => {
                return dispatch => {
                    if (callback) {
                        dispatch(callback());
                    }
                }
            })
            .catch(err => console.log('Error while removing user', err));
            break;
        }
        default: {
            return;
        }
    }
};

export const editUser = (type, editedUser, session = '', callback) => {
    switch(type) {
        case 'update': {
            fetch(IP_BACK + USERS + `${editedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session,
            },
            body: JSON.stringify(editedUser),
            })
            .then(data => data.json())
            .then(data => {
                return dispatch => {
                    if (callback) {
                        dispatch(callback());
                    }
                }
            })
            .catch(err => console.log('Error while editing user', err));
            break;
        }
        case 'create': {
            const creatableData = {
                firstName: editedUser.firstName,
                lastName: editedUser.lastName,
                phone: editedUser.phone,
                email: editedUser.email,
                id: editedUser.id,
                role: editedUser.role,
            }
            fetch(IP_BACK + USERS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session,
            },
            body: JSON.stringify(creatableData),
            })
            .then(data => data.json())
            .then(data => {
                return dispatch => {
                    if (callback) {
                        dispatch(callback());
                    }
                }
            })
            .catch(err => console.log('Error while adding user', err));
            break;
        }
        case 'remove': {
            fetch(IP_BACK + USERS + `${editedUser.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session,
            },
            })
            .then(data => data.json())
            .then(data => {
                return dispatch => {
                    if (callback) {
                        dispatch(callback());
                    }
                }
            })
            .catch(err => console.log('Error while removing user', err));
            break;
        }
        default: {
            return;
        }
    }
};