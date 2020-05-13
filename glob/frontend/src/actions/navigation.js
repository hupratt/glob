import * as actionTypes from "./actionTypes";

export const searchThis = (e, callback) => {
  return dispatch => {
    dispatch({ type: actionTypes.SEARCH, searchTerm: e.target.value });
    callback(e.target.value);
  };
};
