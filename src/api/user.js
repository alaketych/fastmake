import { userSetUserRole } from '../redux/actions/user';
import { userAuthSuccess } from '../redux/actions';
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
    .then( ({role, tokenString}) => {
        if (tokenString) {
            callback();
            dispatch(userAuthSuccess(tokenString));
            dispatch(userSetUserRole(role));
            localStorage.setItem('token', tokenString);
            localStorage.setItem('userRole', role);
        }
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
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                callback(res.email);
            }
        })
    }
}