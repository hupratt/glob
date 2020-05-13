import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  searchTerm: ""
};

const updateSearch = (state, action) => {
  return updateObject(state, {
    searchTerm: action.searchTerm
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH:
      return updateSearch(state, action);

    default:
      return state;
  }
};

export default reducer;
