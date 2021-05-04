export const SET_CLEAR_CART = 'SET_CLEAR_CART';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const PLUS_CART_ITEM = 'PLUS_CART_ITEM';
export const MINUS_CART_ITEM = 'MINUS_CART_ITEM';
export const CHECKOUT_CART_ITEM = 'CHECKOUT_CART_ITEM';


export const clearCart = () => ({
  type: SET_CLEAR_CART,
});

export const removeCartItem = (id) => ({
  type: REMOVE_CART_ITEM,
  payload: id,
});

export const plusCartItem = (id) => ({
  type: PLUS_CART_ITEM,
  payload: id,
});

export const minusCartItem = (id) => ({
  type: MINUS_CART_ITEM,
  payload: id,
});

export const checkoutItem = () =>  ({
  type: CHECKOUT_CART_ITEM
})