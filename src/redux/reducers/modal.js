import { SHOW_MODAL, HIDE_MODAL } from '../actions';

const initialState = {
    open: false,
    content: '',
    message: '',
  };
  
  export const products = (state = initialState, action) => {
  switch(action.type) {
    case SHOW_MODAL: {
        return {
            ...state,
            open: true,
            content: action.content
        }
    }
    case HIDE_MODAL: {
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