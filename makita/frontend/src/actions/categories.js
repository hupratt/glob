import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchCategories = (url_endpoint) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING_FETCH_POSTS });
    console.log("running axios to fetch first the categories");
    axios
      .get(url_endpoint)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_CATEGORIES_SUCCESS,
          data: Object.values(res.data),
          length: res.data.count,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FETCH_POSTS_FAIL, error: err });
      });
  };
};
