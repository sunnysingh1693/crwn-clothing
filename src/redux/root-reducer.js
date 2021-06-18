import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // "storage" is the window.localStorage object from 'redux-persist'

import cartReducer from "./cart/cart.reducer";
import userReducer from "./user/user.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig = {
  key: 'root', // represents from what point in our reducer store we want start storing anything
  storage,
  whitelist: ['cart'] // Outta all our reducers, which ones we wanna persist (store); 'user' is persisted by Firebase
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer); // The 'persistReducer' returns a modified version of our 'rootReducer' w/persistence capabilities