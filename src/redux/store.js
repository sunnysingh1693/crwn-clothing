import { applyMiddleware, createStore } from "redux";
import {persistStore} from 'redux-persist';
import logger from "redux-logger";
import thunk from 'redux-thunk';
import rootReducer from "./root-reducer";

const middlewares = [thunk]; // we can add more middlewares in the array

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// spreading the "middlewares" passes each array items as individual args to the applyMiddleware()
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// This "persistor" is a persisited version pf out store. Using this we will create a new provider that will wrap our application. 
export const persistor = persistStore(store)

// export default {store, persistor}; // It is passed to the <provider> component from Redux