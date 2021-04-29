const initialState = {
  items: [],
  isLoaded: false,
  editFields: {
    thumbnail: null,
    title: '',
    description: '',
    price: null,
    discount: null,
    link: '',
  }
};

export const products = (state = initialState, action) => {
switch(action.type) {
  case 'SET_PRODUCTS':
    return {
      ...state,
      items: action.payload,
      isLoaded: true,
    }
  case 'SET_EDIT_FIELDS':
    return {
      ...state,
      editFields: action.editFields,
    }
  case 'SET_LOADED':
    return {
      ...state,
      isLoaded: action.payload,
    }

  default:
    return state
}
}

export default products