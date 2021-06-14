import { createSelector } from 'reselect';

const selectCart = state => state.cart; // this is a i/p selector, it's a function that gets the whole state & just returns a slice of it, one layer deep usually.

export const selectCartItems = createSelector(
  [selectCart], // an array of i/p selectors
  (cart) => cart.cartItems // function that will return the value we want outta selector. Takes args as o/p of the selectors from the array of selectors in the same order.
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
  ),
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  ),
)