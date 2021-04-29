import { 
  SET_SORT_BY,
  SET_CATEGORY,
} from '../actions/filters';
import { 
  EDIT_PRODUCT_SEARCH,
  EDIT_PRODUCT_SEARCH_RESET,
} from '../actions';

const initialState = {
  category: [],
  sortBy: 'id',
  pageNumber: 1,
  editProductsSearchType: '',
  editProductsSearchValue: '',
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
  if (action.type === EDIT_PRODUCT_SEARCH) {
    return {
      ...state,
      [action.name]: action.value,
    }
  }
  if (action.type === EDIT_PRODUCT_SEARCH_RESET) {
    return {
      ...initialState,
    }
  }
  return state
}

export default filters