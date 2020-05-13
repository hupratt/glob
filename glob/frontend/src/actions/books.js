import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchBooks = (url_endpoint) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING_BOOKS });
    console.log("running axios to fetch first 12 books");
    axios
      .get(url_endpoint)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_SUCCESS,
          data: Object.values(res.data.results),
          _length: res.data.count,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FETCH_FAIL, error: err });
      });
  };
};

export const onSelectRadio = (event) => {
  return (dispatch) => {
    console.log(`language ${event.currentTarget.value} selected`);
    dispatch({
      type: actionTypes.RADIO_BUTTON_CLICK,
      language: event.currentTarget.value,
    });
  };
};

export const onPageChange = (pageNumber) => {
  return (dispatch) => {
    console.log(`${pageNumber} was called`);
    dispatch({ type: actionTypes.PAGE_CHANGED, currentPage: pageNumber });
  };
};

export const loadmoar = (url_endpoint, bookPerPage, offset) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING_MORE_BOOKS });
    axios
      .get(url_endpoint)
      .then((res) => {
        dispatch({
          type: actionTypes.LOAD_MORE,
          data: Object.values(res.data.results),
          offset: offset,
          bookPerPage: bookPerPage,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FETCH_FAIL, error: err });
      });
  };
};
