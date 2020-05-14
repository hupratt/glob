import booksReducer from "./posts";
import tagsReducer from "./tags";
import categoriesReducer from "./category";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
// thunk allows to run async tasks in our action creators
import thunk from "redux-thunk";
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  posts: booksReducer,
  tags: tagsReducer,
  category: categoriesReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhances(applyMiddleware(thunk))
);
