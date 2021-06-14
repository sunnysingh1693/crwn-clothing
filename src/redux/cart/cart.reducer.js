import {CartActionTypes} from './cart.types'
import { addItemsToCart } from './cart.utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden // since we're just toggling the state value, no need for payload here
      }
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemsToCart(state.cartItems, action.payload)
        // [...state.cartItem, action.payload]
      }
    default:
      return state;
  }
};

export default cartReducer;