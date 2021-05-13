import { SHOW_MESSAGE, HIDE_MESSAGE } from '../actions';

const initialState = {
    open: false,
    message: '',
  };
  
  export const products = (state = initialState, action) => {
  switch(action.type) {
    case SHOW_MESSAGE: {
        return {
            ...state,
            open: true,
            message: action.message
        }
    }
    case HIDE_MESSAGE: {
        return {
            ...state,
            open: false,
        }
    }
    default:
      return state
  }
  }
  
  export default products