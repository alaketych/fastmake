import { 
  SET_SORT_BY,
  SET_CATEGORY,
} from '../actions/filters';

const initialState = {
  category: [],
  sortBy: 'id',
  pageNumber: 1,
}

const filters = (state = initialState, action) => {
  if (action.type === SET_SORT_BY) {
    return {
      ...state,
      sortBy: action.payload,
    }
  }

  if (action.type === SET_CATEGORY) {
    return {
      ...state,
      category: action.payload,
    }
  }

  if (action.type === 'PAGE_CHANGE') {
    return {
      ...state,
      pageNumber: action.page,
    }
  }

  return state
}

export default filters