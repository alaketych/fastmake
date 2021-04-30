import * as Actions from '../actions';

const initialState = {
    loggedIn: false,
    role: 'guest',
    isLoading: false,
    email: '',
};
  
  export const products = (state = { ...initialState }, action) => {
  switch(action.type) {
    case Actions.SET_USER_ROLE:
      return {
        ...state,
        loggedIn: action.loggedIn,
        role: action.role,
      }
    case Actions.USER_LOG_OUT:
      return { ...initialState };

    case Actions.USER_IS_LOADING: {
        return {
            ...state,
            isLoading: action.isLoading,
        }
    }
    case Actions.USER_SET_DEFAULT: {
      return {
        ...state,
        email: action.email,
      }
    }
    case Actions.USER_SET_DEFAULT_RESET: {
      return {
        ...state,
        email: '',
      }
    }
    default:
      return state
  }
  }
  
  export default products