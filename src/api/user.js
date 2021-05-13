import { userSetUserRole } from '../redux/actions/user';
import { showMessage, userAuthSuccess } from '../redux/actions';
import {
    IP_BACK,
    LOGIN,
    REGISTER,
} from '../configuration';

export const getUserData = (credits, callback = () => {}) => {
return dispatch => {
    fetch(IP_BACK + LOGIN, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(credits)
    })
    .then(data => data.json())
    .then( ({role, tokenString, message}) => {
        if (message) {
            dispatch(showMessage({
                message: message,
            }))
        }
        if (tokenString) {
            callback();
            dispatch(userAuthSuccess(tokenString));
            dispatch(userSetUserRole(role));
            localStorage.setItem('token', tokenString);
            localStorage.setItem('userRole', role);
            dispatch(showMessage({
                message: 'Logged in!',
            }));
        }
    })
    .catch(error => {
    })
}
};

export const registerUser = (credits, callback = () => {}) => {
    return dispatch => {
        fetch(IP_BACK + REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credits)
        })
        .then(res => res.json())
        .then(res => {
            if (res.message) {
                dispatch(showMessage({
                    message: res.message,
                }));
            } else {
                callback(res.email);
            }
        })
    }
}