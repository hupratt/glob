import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  categories: [],
  length: 0,
};

const fetchItemsSuccess = (state, action) => {
  return updateObject(state, {
    categories: action.data,
    length: action.length,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return fetchItemsSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
