export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_CATEGORY = 'SET_CATEGORY';

export const setSortBy = name => ({
  type: SET_SORT_BY,
  payload: name,
})

export const setCategory = catIndex => ({
  type: SET_CATEGORY,
  payload: catIndex,
})