import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";

const middlewares = [logger]; // we can add more middlewares in the array

// spreading the "middlewares" passes each array items as individual args to the applyMiddleware()
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store; // It is passed to the <provider> component from Redux