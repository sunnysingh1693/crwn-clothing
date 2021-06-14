/* Utility functions allow us to keep our files clean and organise functions that we may need in multiple files in one location. */

export const addItemsToCart = (cartItems, cartItemToAdd) => {
  const doesNewItemExist = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (doesNewItemExist) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
