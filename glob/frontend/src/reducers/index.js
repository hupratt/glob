import authReducer from "./auth";
import cartReducer from "./cart";
import booksReducer from "./books";
import bookReducer from "./book";
import checkoutReducer from "./checkout";
import navigationReducer from "./navigation";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
// thunk allows to run async tasks in our action creators
import thunk from "redux-thunk";
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  books: booksReducer,
  checkout: checkoutReducer,
  book: bookReducer,
  navigation: navigationReducer
});

export const store = createStore(
  rootReducer,
  composeEnhances(applyMiddleware(thunk))
);
