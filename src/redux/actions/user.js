export const USER_LOG_OUT = 'USER_LOG_OUT';
export const SET_USER_ROLE = 'SET_USER_ROLE';
export const USER_IS_LOADING = 'USER_IS_LOADING';
export const USER_SET_DEFAULT = 'USER_SET_DEFAULT';
export const USER_SET_DEFAULT_RESET = 'USER_SET_DEFAULT_RESET';

export const userLogOut = () => ({
    type: USER_LOG_OUT,
});
  
export const userSetUserRole = role => ({
    type: SET_USER_ROLE,
    role,
    loggedIn: true,
});

export const userSetLoading = isLoading => ({
    type: USER_IS_LOADING,
    isLoading,
});

export const userSetDefaultEmail = email => ({
    type: USER_SET_DEFAULT,
    email,
});

export const userSetDefaultEmailReset = () => ({
    type: USER_SET_DEFAULT_RESET,
})