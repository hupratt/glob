import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  tags: [],
  length: 0,
};

const fetchItemsSuccess = (state, action) => {
  return updateObject(state, {
    tags: action.data,
    length: action.length,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TAGS_SUCCESS:
      return fetchItemsSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
